"use server";
import { db } from "@/lib/db";
import { LISTINGS_BATCH } from "@/utils/constants";
import { getCurrentUser } from "./user";
import { MOCK_LISTINGS } from "@/lib/mock-listings";

// Returns mock data filtered/paginated to match a real DB query shape
function queryMockListings(query?: { [key: string]: string | string[] | undefined | null }) {
  const { userId, roomCount, guestCount, bathroomCount, country, category, cursor } = query || {};

  let results = [...MOCK_LISTINGS] as any[];

  if (userId) results = results.filter((l) => l.userId === userId);
  if (category) results = results.filter((l) => l.category === category);
  if (country) results = results.filter((l) => l.country === country);
  if (roomCount) results = results.filter((l) => l.roomCount >= +roomCount);
  if (guestCount) results = results.filter((l) => l.guestCount >= +guestCount);
  if (bathroomCount) results = results.filter((l) => l.bathroomCount >= +bathroomCount);

  if (cursor) {
    const cursorIdx = results.findIndex((l) => l.id === cursor);
    results = cursorIdx >= 0 ? results.slice(cursorIdx + 1) : [];
  }

  const page = results.slice(0, LISTINGS_BATCH);
  const nextCursor = page.length === LISTINGS_BATCH ? page[LISTINGS_BATCH - 1].id : null;

  return { listings: page, nextCursor };
}

export const getListings = async (query?: {
  [key: string]: string | string[] | undefined | null;
}) => {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      country,
      startDate,
      endDate,
      category,
      cursor,
    } = query || {};

    let where: any = {};

    if (userId) where.userId = userId;
    if (category) where.category = category;
    if (roomCount) where.roomCount = { gte: +roomCount };
    if (guestCount) where.guestCount = { gte: +guestCount };
    if (bathroomCount) where.bathroomCount = { gte: +bathroomCount };
    if (country) where.country = country;

    if (startDate && endDate) {
      where.NOT = {
        reservations: {
          some: {
            OR: [
              { endDate: { gte: startDate }, startDate: { lte: startDate } },
              { startDate: { lte: endDate }, endDate: { gte: endDate } },
            ],
          },
        },
      };
    }

    const filterQuery: any = {
      where,
      take: LISTINGS_BATCH,
      orderBy: { createdAt: "desc" },
    };

    if (cursor) {
      filterQuery.cursor = { id: cursor };
      filterQuery.skip = 1;
    }

    const listings = await db.listing.findMany(filterQuery);

    const nextCursor =
      listings.length === LISTINGS_BATCH ? listings[LISTINGS_BATCH - 1].id : null;

    // Fall back to mock data when the database has no listings
    if (listings.length === 0) {
      return queryMockListings(query);
    }

    return { listings, nextCursor };
  } catch {
    // DB not configured — serve mock data so the portfolio always looks populated
    return queryMockListings(query);
  }
};

export const getListingById = async (id: string) => {
  try {
    const listing = await db.listing.findUnique({
      where: { id },
      include: {
        user: { select: { name: true, image: true } },
        reservations: { select: { startDate: true, endDate: true } },
      },
    });

    if (listing) return listing;
  } catch {
    // fall through to mock
  }

  // Check mock data
  const mock = MOCK_LISTINGS.find((l) => l.id === id) as any;
  if (mock) {
    return {
      ...mock,
      reservations: [],
    };
  }

  return null;
};

export const createListing = async (data: { [x: string]: any }) => {
  const {
    category,
    location: { region, label: country, latlng },
    guestCount,
    bathroomCount,
    roomCount,
    image: imageSrc,
    price,
    title,
    description,
  } = data;

  Object.keys(data).forEach((value: any) => {
    if (!data[value]) {
      throw new Error("Invalid data");
    }
  });

  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized!");

  const listing = await db.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      country,
      region,
      latlng,
      price: parseInt(price, 10),
      userId: user.id,
    },
  });

  return listing;
};
