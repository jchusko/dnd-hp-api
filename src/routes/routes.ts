/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TsoaRoute, fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { HitpointsController } from './../controllers/hitpointsController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "HitPointStatus": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "currentHP": {"dataType":"double","required":true},
            "maxHP": {"dataType":"double","required":true},
            "temporaryHP": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DamageType": {
        "dataType": "refEnum",
        "enums": ["bludgeoning","piercing","slashing","fire","cold","acid","thunder","lightning","poison","radiant","necrotic","psychic","force"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DamageRequest": {
        "dataType": "refObject",
        "properties": {
            "type": {"ref":"DamageType","required":true},
            "amount": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "HealRequest": {
        "dataType": "refObject",
        "properties": {
            "amount": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TemporaryHPRequest": {
        "dataType": "refObject",
        "properties": {
            "amount": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.patch('/players/:playerId/hp/damage',
            ...(fetchMiddlewares<RequestHandler>(HitpointsController)),
            ...(fetchMiddlewares<RequestHandler>(HitpointsController.prototype.damagePlayer)),

            async function HitpointsController_damagePlayer(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    playerId: {"in":"path","name":"playerId","required":true,"dataType":"string"},
                    damageReq: {"in":"body","name":"damageReq","required":true,"ref":"DamageRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new HitpointsController();

              await templateService.apiHandler({
                methodName: 'damagePlayer',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/players/:playerId/hp/heal',
            ...(fetchMiddlewares<RequestHandler>(HitpointsController)),
            ...(fetchMiddlewares<RequestHandler>(HitpointsController.prototype.healPlayer)),

            async function HitpointsController_healPlayer(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    playerId: {"in":"path","name":"playerId","required":true,"dataType":"string"},
                    healReq: {"in":"body","name":"healReq","required":true,"ref":"HealRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new HitpointsController();

              await templateService.apiHandler({
                methodName: 'healPlayer',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/players/:playerId/hp/grant-temporary-hp',
            ...(fetchMiddlewares<RequestHandler>(HitpointsController)),
            ...(fetchMiddlewares<RequestHandler>(HitpointsController.prototype.addTemporaryHealthPointsToPlayer)),

            async function HitpointsController_addTemporaryHealthPointsToPlayer(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    playerId: {"in":"path","name":"playerId","required":true,"dataType":"string"},
                    tmpHPReq: {"in":"body","name":"tmpHPReq","required":true,"ref":"TemporaryHPRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new HitpointsController();

              await templateService.apiHandler({
                methodName: 'addTemporaryHealthPointsToPlayer',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/players/:playerId/hp',
            ...(fetchMiddlewares<RequestHandler>(HitpointsController)),
            ...(fetchMiddlewares<RequestHandler>(HitpointsController.prototype.getPlayerHitPoints)),

            async function HitpointsController_getPlayerHitPoints(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    playerId: {"in":"path","name":"playerId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new HitpointsController();

              await templateService.apiHandler({
                methodName: 'getPlayerHitPoints',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
