export type WarningDetails = {
  verification?: {
    temperatureOutOfRange: boolean;
    oxygenOutOfRange: boolean;
    phOutOfRange: boolean;
  };
};
