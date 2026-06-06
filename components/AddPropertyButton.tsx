"use client";
import React from "react";
import { MdAddHome } from "react-icons/md";
import Modal from "@/components/modals/Modal";
import RentModal from "@/components/modals/RentModal";

const AddPropertyButton = () => {
  return (
    <Modal>
      <Modal.Trigger name="share">
        <button
          type="button"
          className="mt-2 inline-flex items-center gap-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 text-sm transition-colors"
        >
          <MdAddHome size={18} />
          List your property
        </button>
      </Modal.Trigger>
      <Modal.Window name="share">
        <RentModal />
      </Modal.Window>
    </Modal>
  );
};

export default AddPropertyButton;
