'use strict';

const router = module.exports = require('express').Router();

router.get('/ui', function(req, res, next) {
    res.render('ui/pages/ui');
});

router.get('/ui/list/simple', function(req, res, next) {
    res.render('ui/pages/list_simple');
});

router.get('/ui/list/query', function(req, res, next) {
    res.render('ui/pages/list_query');
});

router.get('/ui/list/complex', function(req, res, next) {
    res.render('ui/pages/list_complex');
});

router.get('/ui/list/tab', function(req, res, next) {
    res.render('ui/pages/list_tab');
});

router.get('/ui/list/complex/tab', function(req, res, next) {
    res.render('ui/pages/list_complex_tab');
});
router.get('/ui/list/card', function(req, res, next) {
    res.render('ui/pages/list_card');
});


router.get('/ui/form/page', function(req, res, next) {
    res.render('ui/pages/form_page');
});

router.get('/ui/form/popover', function(req, res, next) {
    res.render('ui/pages/form_popover');
});

router.get('/ui/form/introJS', function(req, res, next) {
    res.render('ui/pages/introJS');
});

router.get('/ui/form/dialog', function(req, res, next) {
    res.render('ui/pages/form_dialog');
});

router.get('/ui/form/complex', function(req, res, next) {
    res.render('ui/pages/form_complex');
});

router.get('/ui/list/data', function(req, res, next) {
    let list = [
        {name:'N1', mobile:'13300000001', address: {province:'北京', city:'北京', addr:'通州1'}},
        {name:'N2', mobile:'13300000002', address: {province:'北京', city:'北京', addr:'通州2'}},
        {name:'N3', mobile:'13300000003', address: {province:'北京', city:'北京', addr:'通州3'}},
        {name:'N4', mobile:'13300000004', address: {province:'北京', city:'北京', addr:'通州4'}},
        {name:'N5', mobile:'13300000005', address: {province:'北京', city:'北京', addr:'通州5'}},
        {name:'N6', mobile:'13300000006', address: {province:'北京', city:'北京', addr:'通州6'}},
        {name:'N7', mobile:'13300000007', address: {province:'北京', city:'北京', addr:'通州7'}},
        {name:'N8', mobile:'13300000008', address: {province:'北京', city:'北京', addr:'通州8'}},
        {name:'N9', mobile:'13300000009', address: {province:'北京', city:'北京', addr:'通州9'}},
        {name:'N10', mobile:'13300000010', address: {province:'北京', city:'北京', addr:'通州10'}},
        {name:'N11', mobile:'13300000011', address: {province:'北京', city:'北京', addr:'通州11'}},
        {name:'N12', mobile:'13300000012', address: {province:'北京', city:'北京', addr:'通州12'}},
        {name:'N13', mobile:'13300000013', address: {province:'北京', city:'北京', addr:'通州13'}},
        {name:'N14', mobile:'13300000014', address: {province:'北京', city:'北京', addr:'通州14'}},
        {name:'N15', mobile:'13300000015', address: {province:'北京', city:'北京', addr:'通州15'}},
        {name:'N16', mobile:'13300000016', address: {province:'北京', city:'北京', addr:'通州16'}},
        {name:'N17', mobile:'13300000017', address: {province:'北京', city:'北京', addr:'通州17'}},
        {name:'N18', mobile:'13300000018', address: {province:'北京', city:'北京', addr:'通州18'}},
        {name:'N19', mobile:'13300000019', address: {province:'北京', city:'北京', addr:'通州19'}},
        {name:'N20', mobile:'13300000020', address: {province:'北京', city:'北京', addr:'通州20'}},
    ];

    const name = req.query.name;
    const mobile = req.query.mobile;
    const currentPage = req.query.currentPage * 1;
    const pageSize = req.query.pageSize * 1;

    list = list.filter(function (item) {
        return !name || item.name.indexOf(name) != -1;
    });

    list = list.filter(function (item) {
        return !mobile || item.mobile.indexOf(mobile) != -1;
    });

    const totalSize = list.length;

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    list = list.slice(start, end);

    res.json({
        success: true,
        data: {
            results: list,
            totalSize: totalSize
        }
    });
});

router.get('/ui/map', function(req, res, next) {
    res.render('ui/pages/map');
});
router.post('/ui/form/submit', function(req, res, next) {
    setTimeout(function () {
        res.json({
            success: true,
            data: {
            }
        });
    }, 5000);
});
