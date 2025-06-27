import { create } from "zustand";

interface CreateAccountStepStore {
    step: number;
    setStep: (step: number) => void;
}

const useCreateAccountStep = create<CreateAccountStepStore>((set) => ({
    step: 1,
    setStep: (step) => set({ step }),
}))

export default useCreateAccountStep;