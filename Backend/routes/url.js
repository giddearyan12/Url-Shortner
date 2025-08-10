import express from 'express'
import {getUrls, handleGet, handleNewUrl} from "../controllers/url.js";

const router = express.Router();

router.post("/", handleNewUrl);
router.post("/urls", getUrls);

router.get("/:shortId", handleGet);

export default router;
