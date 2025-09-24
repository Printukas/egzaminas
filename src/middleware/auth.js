import jwt from "jsonwebtoken";
import User from "../../models/user.js";

export default async function auth(req, res, next) {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Paimam userį iš DB
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({ message: "Vartotojas nerastas" });
      }

      // Užtikrinam, kad req.user būtų paprastas objektas su role
      req.user = {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
      };

      return next();
    } catch (err) {
      console.error("Auth klaida:", err);
      return res.status(401).json({ message: "Netinkamas arba pasibaigęs tokenas" });
    }
  }

  return res.status(401).json({ message: "Neautorizuota prieiga" });
}
