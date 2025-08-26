"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeerModule = void 0;
const common_1 = require("@nestjs/common");
const peer_service_1 = require("./peer.service");
const peer_controller_1 = require("./peer.controller");
const wgcore_module_1 = require("../components/wgcore/wgcore.module");
const prisma_module_1 = require("../components/prisma/prisma.module");
let PeerModule = class PeerModule {
};
exports.PeerModule = PeerModule;
exports.PeerModule = PeerModule = __decorate([
    (0, common_1.Module)({
        providers: [peer_service_1.PeerService],
        controllers: [peer_controller_1.PeerController],
        imports: [prisma_module_1.PrismaModule, wgcore_module_1.WgcoreModule]
    })
], PeerModule);
//# sourceMappingURL=peer.module.js.map