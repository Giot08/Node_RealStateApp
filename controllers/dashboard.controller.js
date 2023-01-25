const admin = (req, res) => {
    res.render("dashboard/home", {
        page: "Dashboard",
        nav: true
    })
};

export { admin };
