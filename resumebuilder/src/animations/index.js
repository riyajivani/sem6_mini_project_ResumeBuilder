export const slideUpDownMenu = {
     initial: { opacity: 0, y: 20 },
     animate: { opacity: 1, y: 0 },
     exit: { opacity: 0, y: 20 },
}


export const FadeInOutWithOpacity = {
     initial: { opacity: 0 },
     animate: { opacity: 1 },
     exit: { opacity: 0 },
}

export const SlideUpDownWithScale = {
     initial: { opacity: 0, scale: 0.6, y: 20 },
     animate: { opacity: 1, scale: 1, y: 0 },
     exit: { opacity: 0, scale: 0.6, y: 20 }
}

export const scaleInOut = (index) => {
     return {
          initial: { opacity: 0, scale: 0.85 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.85 },
          transition: { delay: index * 0.3, ease: "easeInOut" }
     };
}

export const HideAndShow = {
     initial: { opacity: 0, scale: 0.6, x: 50 },
     animate: { opacity: 1, scale: 1, x: 0 },
     exit: { opacity: 0, scale: 0.6, x: 50 }
}

export const opacityInOut = (index) => {
     return {
          initial: { opacity: 0, scale: 20 },
          animate: { opacity: 1, scale: 0 },
          exit: { opacity: 0, scale: 20 },
          transition: { delay: index * 0.1, ease: "easeInOut" }
     };
}