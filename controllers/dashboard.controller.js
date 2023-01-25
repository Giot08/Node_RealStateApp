const dashboard = (req, res) => {
    res.render("dashboard/home", {
        page: "Dashboard",
        nav: true
    })
};
const createSelling = (req, res) => {
    res.render("dashboard/create", {
        page: "Dashboard",
        subtitle: "Create new selling",
        nav: true
    })
};

export { dashboard, createSelling };
