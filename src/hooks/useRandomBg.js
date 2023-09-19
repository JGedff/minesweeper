import { waitFor } from '@testing-library/react'
import React, { useState, useEffect } from 'react'

export function useRandomBg () {
  const [bgCountryName, setBgCountryName] = useState()
  const [background, setBackground] = useState('')

  const objectIsImage = (title) => {
    return (title.endsWith('.png') || title.endsWith('.jpg'))
  }

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name')
      .then(res => res.json())
      .then((data) => {
        const numberOfObjects = data.length
        const indexRandomObject = Math.trunc(Math.random() * numberOfObjects)
        const commonCountryName = data[indexRandomObject].name.common

        waitFor(() => {
          setBgCountryName(commonCountryName)
        })
      })
  }, [])

  useEffect(() => {
    fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&titles=${bgCountryName}&format=json&prop=images`)
      .then(res => res.json())
      .then((data) => {
        if (bgCountryName !== undefined) {
          const Files = (Object.values(data.query.pages)[0]).images

          if (Files !== undefined) {
            for (let counter = 0; counter < Files.length; counter++) {
              if (objectIsImage(Files[counter].title)) {
                const selectedImage = Files[counter].title

                fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&iiprop=url&prop=imageinfo&titles=${selectedImage}&format=json`)
                  .then(res => res.json())
                  .then((data) => {
                    const selectedURL = (Object.values(data.query.pages)[0]).imageinfo[0].url
                    setBackground(selectedURL)
                  })
                break
              }
            }
          }
        }
      })
  }, [bgCountryName])

  return { bgCountryName, background }
}
