"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_module_1 = require("./app.module");
const core_1 = require("@nestjs/core");
async function bootstrap() {
    const replServer = await (0, core_1.repl)(app_module_1.AppModule);
    replServer.setupHistory('.nestjs_repl_history', (err) => {
        if (err) {
            console.error(err);
        }
    });
}
bootstrap();
//# sourceMappingURL=repl.js.map