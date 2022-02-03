const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multer");
const passport = require("passport");
const {
  shopCreate,
  getShops,
  productCreate,
  fetchShop,
} = require("./controllers");
router.param("shopId", async (req, res, next, shopId) => {
  const foundShop = await fetchShop(shopId, next);
  if (foundShop) {
    req.shop = foundShop;
    next();
  } else next({ status: 404, message: "Shop not found" });
});
router.get("/", getShops);
router.post("/", passport.authenticate("jwt", { session: false }), shopCreate);
router.post(
  "/:shopId/products",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  productCreate
);

module.exports = router;
