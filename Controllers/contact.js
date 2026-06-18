import { Contact } from "../Models/Contact.js";

// Create new contact
export const newContact = async (req,res)=>{
    const {name,email,phone,type} = req.body;
    console.log("req.user is = ", req.user);

    if(name==""||email==""||phone==""||type=="") return res.json({
        massage:'All fields are required',
        success:false
    })

    let saveContact = await Contact.create({
        name,email,phone,type,user:req.user
    })

    res.json({
        massage : 'contact saved successfully',
        saveContact,
        success:true
    })
}

// get all contact
export const getallContact = async (req,res)=>{
    const userContact = await Contact.find();

    if(!userContact) return res.json({
        massage:'No contect exist',
        success:false
    })

    res.json({
        massage : 'All contacts fetched',
        userContact,
        success:true
    })    
}

// get contact by Id
export const getContactbyId = async (req,res)=>{
    // my code
    // const { _id } = req.body;
    // const userID = await Contact.findOne({_id})

    // if(!userId) return res.json({
    //     massage:'No contect exist',
    //     success:false
    // })

    // res.json({
    //     massage : 'Id Contact fetched',
    //     userID,
    //     success:true
    // }) 

    //dhasu sir code
    const id = req.params.id;

    const userContact = await Contact.findById(id);
    if(!userContact) return res.json({
        massage:'No contect exist',
        success:false
    })
    res.json({
        massage : 'Id Contact fetched',
        userContact,
        success:true
    }) 
}

// update contact by id
export const updateContactById = async (req,res)=>{
    const id = req.params.id; // paramas used to get data from url
    const {name,email,phone,type} = req.body;
    console.log(id);

    const updatedContact = await Contact.findByIdAndUpdate(id,{
        name,email,phone,type
    }); //update if any other added

    if(!updatedContact) return res.json({massage:"No contact found"});

    res.json({
        massage:"Contact updated successfully",
        updatedContact
    })
}

// delete contact
export const deleteContactById = async (req,res)=>{

    const id = req.params.id;
    const {name,email,phone,type} = req.body;
    console.log(id);

    const deletedContact = await Contact.findByIdAndDelete(id); //update if any other added

    if(!deletedContact) return res.json({massage:"No contact found"});

    res.json({
        massage:"Contact deleted successfully",
    })

}

// find contacts by userid
export const getContactByUserId = async (req,res)=>{
    const id = req.params.id;

    const userContact = await Contact.find({user:id});
    if(!userContact) return res.json({
        massage:'No contact exist',
        success:false
    })
    res.json({
        massage : 'User specific Contact fetched',
        userContact,
        success:true
    }) 

}
