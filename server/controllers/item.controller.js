import Item from '../models/item.model.js'

export const get_items = (req, res) => {
    Item.find().sort({date:-1})
    .then(items => res.json(items))
}

// export const get_details = (req, res) => {
//     try {
//         const itemId = req.params._id
//         const item = Item.findById(itemId)

//         if(!item) {
//             return res.status(404).json({msg: 'Item not found'})
//         }

//         res.json(item)
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: "Internal Server Error"})
//     }
// }

export const post_item = (req, res) => {
    const newItem = new Item(req.body)
    newItem.save().then((item) => res.json(item))
}

export const update_item = (req,res) => {
    Item.findByIdAndUpdate({_id: req.params.id},req.body).then(function(item){
        Item.findOne({_id: req.params.id}).then(function(item){
            res.json(item);
        });
    });
}

export const delete_item = (req,res) => {
    Item.findByIdAndDelete({_id: req.params.id}).then(item => res.json({success: true}))
}

const itemController = { get_items, post_item, update_item, delete_item}
export default itemController