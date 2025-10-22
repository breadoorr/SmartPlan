"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const generate_1 = require("./generate");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = process.env.PORT || 3001;
app.post("/api/generate-tasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userInput } = req.body;
        if (!userInput)
            return res.status(400).json({ error: "User input is required" });
        const structuredInput = yield (0, generate_1.generateGeminiContent)(`Structure the following project description for task planning: ${userInput}`);
        const taskJson = yield (0, generate_1.generateGeminiContent)(`
      Generate a JSON array of tasks for this project:
      ${structuredInput}
      Each task should have id, title, description, startDate, endDate, and completed=false.
    `);
        const jsonMatch = taskJson.match(/\[[\s\S]*\]/);
        const tasks = JSON.parse(jsonMatch ? jsonMatch[0] : taskJson);
        res.json({ tasks });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to generate tasks" });
    }
}));
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
