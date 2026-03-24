export type Notice = { type: "success" | "error"; text: string } | null;

export type ReviewModalProps = {
  open: boolean;
  onClose: () => void;
  submitting: boolean;
  isLogged: boolean;
  computedLockedName: string;
  rating: number;
  setRating: (v: number) => void;
  displayName: string;
  setDisplayName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  comment: string;
  setComment: (v: string) => void;
  MAX_FILES: number;
  pickedFiles: File[];
  previews: string[];
  onPickFiles: (list: FileList | null) => void;
  removePicked: (idx: number) => void;
  onSubmit: () => void | Promise<void>;
  notice?: Notice;
  onDismissNotice?: () => void;
  uploadPct?: number;
  maxCommentChars?: number;
};