const Theme = {
    colors: {
      primary: '#3498db',
      secondary: '#2980b9',
      text: '#ecf0f1',
      textblack: '#0d0d0d',
      textwhite: '#f0f0f0',
      button: '#e74c3c',
      active: '#c0392b',
    },


    media: {
        phone: "(max-width: 425px)",
        tablet: "(max-width: 768px) and (min-width: 425px)",
    }
}

// @media ${props => props.theme.media.phone} { bla bla bla : 1px solid bla bla bla}  --- import in current style

export default Theme