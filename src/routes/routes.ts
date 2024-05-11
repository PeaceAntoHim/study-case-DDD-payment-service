import { App } from "@/dependency-injection/dependency-injection";

const endpointsUser = App.endpointUser.registerRoute();
const endpointPayment = App.endpointPayment.registerRoute();

export default {
  endpointsUser,
  endpointPayment,
};
