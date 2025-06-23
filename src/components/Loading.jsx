export default function Loading({ dialogRef }) {
  return (
    <dialog
      className="left-4 top-[3.5%] w-full h-full bg-[#0000005e] rounded-[5px]"
      ref={dialogRef}
    >
      <div className="loadingElement !mt-[250px] !ml-auto !mr-auto"></div>
    </dialog>
  );
}
