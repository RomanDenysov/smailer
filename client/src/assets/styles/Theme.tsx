const Theme = {
    colors: {
      background: '#E4F0E2',
      primary: '#222222',
      secondary: '#DBD6CB',
      active: '#FF4500',
      contrast: '#667985 ',
      
      black: '#171717',
      
      dark: '#333333',
      
      white: '#f0f0f0',
      yellow: '#F4F378 ',
      pink: '#FEB3EF  ',
      blue: '#9DDEF2  ',
    },


    media: {
        phone: "(max-width: 425px)",
        tablet: "(max-width: 768px) and (min-width: 425px)",
    }
}

// @media ${props => props.theme.media.phone} { bla bla bla : 1px solid bla bla bla}  --- import in current style

export default Theme