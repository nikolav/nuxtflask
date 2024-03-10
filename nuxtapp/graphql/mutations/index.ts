export const M_STORAGE_FILE_REMOVE = gql`
  mutation m_storageRemoveFile($fileID: String!) {
    storageRemoveFile(file_id: $fileID) { 
      error, 
      file {
        id,
        data {
          file_id
        }
      }
    }
  }
`;


export const M_docsUpsert = gql`
  mutation m_docsUpsert($topic: String!, $data: JsonData!, $id: ID) {
    docsUpsert(topic: $topic, data: $data, id: $id)    
  }
`;


export const M_docsRm = gql`
  mutation m_docsRm($topic: String!, $id: ID!) {
    docsRm(topic: $topic, id: $id)
  }
`;


export const M_docUpsert = gql`
  mutation m_docUpsert($doc_id: String!, $data: JsonData!) {
    docUpsert(doc_id: $doc_id, data: $data)
  }
`;

export const M_docsUsersAdd = gql`
  mutation m_docsUsersAdd($email: String!, $password: String!) {
    docsUsersAdd(email: $email, password: $password)
  }
`;

export const M_docsTags = gql`
  mutation m_docsTags($id: ID!, $tags: JsonDocsTags!) {
    docsTags(id: $id, tags: $tags)
  }
`;

export const M_docsRmById = gql`
  mutation m_docsRmById($id: ID!) {
    docsRmById(id: $id)
  }
`;

// schema {
//   query: Query
//   mutation: Mutation
// }

// scalar JsonData

// type Var {
//   id: ID!
//   name: String!
//   value: String
// }

// type StorageFileInfo {
//   id: ID!
//   file_id: String!
//   user_id: Int!
//   title: String!
//   description: String!
//   filename: String!
//   path: String!
//   size: Int!
//   mimetype: String!
//   public: Boolean!
//   created_at: String!
//   updated_at: String!
// }

// type StorageFileRemovedDataInfo {
//   file_id: String!
//   user_id: Int!
//   title: String!
//   description: String!
//   filename: String!
//   path: String!
//   size: Int!
//   mimetype: String!
//   public: Boolean!
// }

// type StorageFileRemovedInfoSuccess {
//   id: ID!
//   data: StorageFileRemovedDataInfo!
//   created_at: String!
//   updated_at: String!
// }

// type StorageFileRemovedInfo {
//   error: String
//   file: StorageFileRemovedInfoSuccess
// }

// type Query {

//   # docs
//   docsByTopic(topic: String!): [JsonData!]!

//   status: String!

//   # vars
//   vars: [Var!]!

//   # storage
//   storageList: [StorageFileInfo!]!
// }

// type Mutation {

//   # storage
//   storageRemoveFile(file_id: String!): StorageFileRemovedInfo

//   # docs
//   docsUpsert(topic: String!, data: JsonData!, id: ID): JsonData!
//   docsRm(topic: String!, id: ID!): JsonData
//   docsRmById(id: ID!): JsonData
// 
//   # manage docs/tags: (id, { "@tag/foo": true, "@tag/bar": false })
//   docsTags(id: ID!, tags: JsonDocsTags!): JsonDocsTags!
//   
//   # users
//   docsUsersAdd(email: String!, password: String!): ID
// }
