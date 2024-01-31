
export const Q_statusCheck = gql`
  query q_statusCheck {
    status
  }
`;


export const Q_vars = gql`
  query q_vars {
    vars {
      id,
      name,
      value
    }
  }
`;


export const Q_storageList = gql`
  query q_storageList {
    storageList {
      id
      file_id
      title
      description
      filename
      path
      size
      mimetype
      public
      created_at
      updated_at
    }
  }
`;
