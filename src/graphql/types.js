const { GraphQLObjectType, GraphQLInputObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLInt, GraphQLBoolean, GraphQLFloat } = require('graphql')
const {User, Post} = require('../models')

const UserType = new GraphQLObjectType({
    name:"user",
    description: "User type",
    fields:()=>({
        id : {type: GraphQLID},
        username : {type: GraphQLString},
        email : {type: GraphQLString},
        posts : {
            type : GraphQLList(PostType),
            resolve(parent, args){
                return Post.find({userId : parent.id})
            }
        }
    })
})

const PostType = new GraphQLObjectType({
    name:"Post",
    description:"Post Type",
    fields:()=>({
        id : {type: GraphQLID},
        userId: {type: GraphQLString},
        user:{
            type: UserType,
            resolve(parent, args){
                return User.findById(parent.userId)
            }
        }
    })
})

const PostInputType = new GraphQLObjectType({
    name:"PostInput",
    description:"Post Input Type",
    fields:()=>({
        text: {type: GraphQLString}
    })
})

module.exports={
    UserType,
    PostType,
    PostInputType
}