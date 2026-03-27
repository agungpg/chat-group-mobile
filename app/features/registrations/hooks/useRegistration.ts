import { create } from 'zustand'

type AccountData = {
    username: string;
    email: string;
    password: string;
}
type ProfileData = {
    name: string;
    bio: string;
    avatar: File | null;
}
type State = {
  step: number;
  data: AccountData & ProfileData
}

type Actions = {
  setAccountData: (account: AccountData, step?: number) => void
  setProfileData: (profile: ProfileData) => void
  setStep: (stepNumber: number) => void
  onPrevStep: () => void
  onNextStep: () => void
}

const useRegistration = create<State & Actions>((set) => ({
  step: 0,
  data: {
    username: "",
    email: "",
    password: "",
    name: "",
    bio: "",
    avatar: null
  },
  setAccountData: (account: AccountData, step?: number) => set((state) => ({ 
    data: {
      ...state.data,
      ...account
    },
    step: step ?? state.step,
  })),
  setProfileData: (profile: ProfileData)=> set((state) => ({ 
    data: {
      ...state.data,
      ...profile
    },
  })),
  setStep: (stepNo: number) => set((state) => ({ 
    step: stepNo
  })),
  onNextStep: () => set((state) => ({ 
    step: ++state.step
  })),
  onPrevStep: () => set((state) => ({ 
    step: --state.step
  })),
}))

export default useRegistration