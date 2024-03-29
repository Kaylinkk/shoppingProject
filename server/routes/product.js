const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require("../models/Product");



//=================================
//             product
//=================================




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {

        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage: storage }).single('file');



router.post('/image', (req, res) => {
    // 가져온 이미지를 저장해준다

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })


})

router.post('/', (req, res) => {

    //받아온 정보들을 DB에 넣어 준다.
    const product = new Product(req.body)
    product.save((err) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });

})

router.post('/products', (req, res) => {

    //product collection 에 들어있는 모든 상품 정보를 가져오기

    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let term = req.body.searchTerms;
    let findArgs = {};


    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {

            findArgs[key] = req.body.filters[key]
        }

    }
    if (term) {
        Product.find(findArgs)
            .find({ "title": { '$regex': term, $options: 'i' } })
            .skip(skip)
            .limit(limit)
            .exec((err, productInfo) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({
                    success: true, productInfo,
                    postLength: productInfo.length
                })
            })
    }
    else {
        Product.find(findArgs)
            .populate("writer")
            .skip(skip)
            .limit(limit)
            .exec((err, productInfo) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({
                    success: true, productInfo,
                    postLength: productInfo.length
                })
            })
    }



    //id=123123123,324234234,324234234  type=array
    router.get('/productid', async (req, res) => {

        let type = req.query.type
        let productIds = req.query.id


        if (type === "array") {
            //id=123123123,324234234,324234234 이거를 
            //productIds = ['123123123', '324234234', '324234234'] 이런식으로 바꿔주기
            let ids = req.query.id.split(',')
            productIds = ids.map(item => {
                return item
            })

        }

        //productId를 이용해서 DB에서  productId와 같은 상품의 정보를 가져온다.

        Product.find({ _id: { $in: productIds } })
            .populate('writer')
            .exec((err, product) => {
                if (err) return res.status(400).send(err)
                return res.status(200).json({ product })
            })


    })


})


module.exports = router;