import React, { useState } from 'react'
import { SpeedDial } from '@rneui/base'
import { View } from 'react-native';

export default function SpeedDialItem() {
    const [open,setOpen] = useState(false);
  return (
    <SpeedDial
    overlayColor='transparent'
    isOpen={open}
    icon={{ name: 'edit', color: '#fff' }}
    openIcon={{ name: 'close', color: '#fff' }}
    onOpen={() => setOpen(!open)}
    onClose={() => setOpen(!open)}
  >
    <SpeedDial.Action
      icon={{ name: 'add', color: '#fff' }}
      title="Assign"
      onPress={() => console.log('Add Something')}
    />
    <SpeedDial.Action
      icon={{ name: 'update', color: '#fff' }}
      title="Update"
      onPress={() => console.log('Update Something')}
    />
  </SpeedDial>
  
  )
}

