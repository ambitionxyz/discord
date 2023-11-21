import CreateServerModal from "../modals/create-server-modal";
import DeleteServerModal from "../modals/delete-server-modal";
import InviteModal from "../modals/invite-modal";

export const ModalProvider = () => {
  return (
    <>
      <CreateServerModal />
      <DeleteServerModal />
      <InviteModal />
    </>
  );
};
