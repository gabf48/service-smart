import { hardwareServices } from "./hardware";
import { softwareServices } from "./software";
import { networkServices } from "./network";
import { webServices } from "./web";

export const services = [
  ...hardwareServices,
  ...softwareServices,
  ...networkServices,
  ...webServices,
];