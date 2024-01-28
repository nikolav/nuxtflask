
export const Q_statusCheck = gql`
  query statusCheck {
    status
  }
`;


export const Q_vars = gql`
  query varsList {
    vars {
      id,
      name,
      value
    }
  }
`;
