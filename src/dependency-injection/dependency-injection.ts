import { basicAuthModel, jwtAccessSetup, jwtRefreshSetup, prismaConnection } from "./dependency-injection.init";
import { AccountManagerService } from "@/AccountManager/domain/account-manager.service";
import { AccountManagerQuery } from "@/AccountManager/application/query/account-manager.query";
import { AccountManagerCommand } from "@/AccountManager/application/command/account-manager.command";
import Elysia from "elysia";
import { AccountManagerEndpoint } from "@/AccountManager/endpoint/account-manager.endpoint";
import { AccountManagerRepository } from "@/AccountManager/infrastructure/repository/psql/account-manager.psql";
import { PaymentManagerService } from "@/PaymentManager/domain/payment-manager.service.test";
import { PaymentManagerQuery } from "@/PaymentManager/application/query/payment-manager.query";
import { PaymentManagerCommand } from "@/PaymentManager/application/command/payment-manager.command.test";
import { PaymentManagerRepository } from "@/PaymentManager/infrastructure/repository/psql/payment-manager.psql";
import { PaymentManagerEndpoint } from "@/PaymentManager/endpoint/payment-manager.endpoint";

class Application {
  private _repositoryUser;
  private _serviceUser;
  private _queryUser;
  private _commandUser;
  private _routerUser;
  private _endpointUser;

  private _repositoryPayment;
  private _servicePayment;
  private _queryPayment;
  private _commandPayment;
  private _routerPayment;
  private _endpointPayment;

  constructor() {
    this._repositoryUser = new AccountManagerRepository(prismaConnection());
    this._serviceUser = new AccountManagerService(this._repositoryUser);
    this._queryUser = new AccountManagerQuery(this._serviceUser);
    this._commandUser = new AccountManagerCommand(this._serviceUser);
    this._routerUser = new Elysia({ prefix: "/auth" });
    this._endpointUser = new AccountManagerEndpoint(
      this._queryUser,
      this._commandUser,
      this._routerUser,
      basicAuthModel,
      jwtAccessSetup,
      jwtRefreshSetup
    );

    this._repositoryPayment = new PaymentManagerRepository(prismaConnection());
    this._servicePayment = new PaymentManagerService(this._repositoryPayment);
    this._queryPayment = new PaymentManagerQuery(this._servicePayment);
    this._commandPayment = new PaymentManagerCommand(this._servicePayment);
    this._routerPayment = new Elysia({ prefix: "/payment" });
    this._endpointPayment = new PaymentManagerEndpoint(
      this._queryPayment,
      this._commandPayment,
      this._routerPayment,
      jwtAccessSetup
    );
  }

  get endpointUser() {
    return this._endpointUser;
  }

  get endpointPayment() {
    return this._endpointPayment;
  }
}

export const App = new Application();
