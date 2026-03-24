"use client";

import { useContactFiles } from "./useContactFiles";
import { useContactFormState } from "./useContactFormState";
import { useContactSubmit } from "./useContactSubmit";

export function useContactForm(user: any, motivoParam: string) {
  const state = useContactFormState(user, motivoParam);
  const filesState = useContactFiles();
  const { handleSubmit } = useContactSubmit();

  const submit = async () => {
    await handleSubmit({
      user,
      name: state.name,
      email: state.email,
      reason: state.reason,
      description: state.description,
      phone: state.phone,
      files: filesState.files,
      loading: state.loading,
      setLoading: state.setLoading,
      setNotice: state.setNotice,
      onSuccess: () => {
        state.resetState();
        filesState.resetFiles();
      },
    });
  };

  return {
    ...state,
    ...filesState,
    handleSubmit: submit,
  };
}