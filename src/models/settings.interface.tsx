export interface UserSettings {
  userId: string;
  days?: {
    dom: boolean;
    seg: boolean;
    ter: boolean;
    qua: boolean;
    qui: boolean;
    sex: boolean;
    sab: boolean;
  };
  intervals?: {
    start: string;
    end: string;
  };
}
