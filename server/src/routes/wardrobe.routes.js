import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { wardrobe } from "../controller/wardrobe.controller.js";

const router = Router();

router.route("/add-item").post(protect, wardrobe.addWardrobeItem);
router.route("/get-all").get(protect, wardrobe.getWardrobe);
router.route("/favorite/:id").patch(protect, wardrobe.toggleFavorite);
router.route("/delete/:id").delete(protect, wardrobe.deleteWardrobeItem);

export default router;
