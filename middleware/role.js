
export function adminOnly(req, res, next) {
    if (!req.role) {
        return res.status(401).json({ message: "Belum terautentikasi" })
    }

    if (req.role !== "admin") {
        return res.status(403).json({ message: "Hanya bisa diakses oleh admin" })
    }

    next()
}

export function ownerOnly(req, res, next) {
    if (!req.role) {
        return res.status(401).json({ message: "Belum teratentikasi" })
    }

    if (req.role !== "owner") {
        return res.status(403).json({ message: "Hanya bisa diakses leh owner" })
    }

    next()
}