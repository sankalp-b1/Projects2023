// import React, { useState, useEffect } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';
// import { useSnapshot } from 'valtio';

// import config from '../config/config'
// import state from '../store';
// import { download } from '../assets';
// import { downloadCanvasToImage, render } from '../config/helpers';
// import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
// import { fadeAnimation, slideAnimation } from '../config/motion';
// import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';
 
// const Customizer = () => {
//   const snap = useSnapshot(state);
  
//   const [file, setFile] = useState('');
  
//   const [prompt, setPrompt] = useState('');
//   const [generatingImg, setGeneratingImg] = useState('false');
  
//   const [activeEditorTab, setActiveEditorTab] = useState("");
//   const [activeFilterTab, setActiveFilterTab] = useState({
//     logoShirt: true,
//     stylishShirt: false,
//   })
  
//   //show tab content depending on the activeTab
//   const generateTabContent = () => {
//     switch (activeEditorTab) {
//       case "colorpicker":
//         return <ColorPicker/>
//       case "filepicker":
//         return <FilePicker
//           file={file}
//           setFile={setFile}
//           readFile={readFile}
//         />
//       case "aipicker":
//         return <AIPicker
//           Prompt={prompt}
//           setPrompt={setPrompt}
//           generatingImg={generatingImg}
//           handleSubmit={handleSubmit}
          
//         />;
      
//       default:
//         return null;
    
//     }
    
//   }
  
//   const handleSubmit = async (type) => {
//     if (!prompt) return alert("Please enter a prompt");
    
//     try {
//         // call our backend to generate an ai image
//       setGeneratingImg(true);
      
//       const response = await fetch('http://localhost:5000/api/v1/dalle', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           prompt,
//         })
//       })
      
//       const data = await response.json();
      
//       handleDecals(type, `data:image/png;base64,${data.photo}`)
//     } catch (error) {
//       alert(error)
//     } finally {
//       setGeneratingImg(false);
//       setActiveEditorTab("");
    
//     }
//   }
//   const handleDecals = (type, result) => {
//     const decalType = DecalTypes[type];
    
//     state[decalType.stateProperty] = result;
    
//     if (!activeFilterTab[decalType.FilterTab]) {
//       handleActiveFilterTab(decalType.FilterTab)
//       }
//     }
//   const handleActiveFilterTab = (tabName) => {
//     switch (tabName) {
//       case "logoShirt":
//          state.isLogoTexture = !activeFilterTab[tabName];
//         break;
//       case "stylishShirt":
//          state.isFullTexture = !activeFilterTab[tabName];
//         break;
      
//       default:
//         state.isLogoTexture = true;
//         state.isFullTexture = false;
//     }
//     // after setting the state, activeFilterTab is updated
    
//     setActiveFilterTab((prevState) => {
//       return {
//         ...prevState,
//         [tabName]: !prevState[tabName]
//       }
//     })
//   }
  
//   const readFile = (type) => {
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         handleDecals(type, reader.result);
//         setActiveEditorTab('');
//       };
//       reader.readAsDataURL(file);
//     }
//   };
  
//   return (
//     <AnimatePresence>
//       {!snap.intro && (
//         <>
//           <motion.div
//             key="custom"
//             className="absolute top-0 left-0 z-10"
//             {...slideAnimation('left')}
//           >
//             <div className="flex items-center min-h-screen">
//               <div className="editortabs-container tabs">
//                 {EditorTabs.map((tab) => (
//                   <Tab
//                     key={tab.name}
//                     tab={tab}
//                     handleClick={() => setActiveEditorTab(tab.name)}
//                   />
                  
//                 ))}
                
//                 {generateTabContent()}
//               </div>
//             </div>
//           </motion.div>
          
//           <motion.div
//             className="absolute z-10 top-5 right-5"
//             {...fadeAnimation}
//           >
//             <CustomButton
//               type="filled"
//               title="Go Back"
//               handleClick={() => state.intro = true}
//               customStyles="w-fit px-4 py-2.5 font-bold text-sm"
//             />
//           </motion.div>
//           <motion.div
//             className="filtertabs-container"
//             {...slideAnimation('up')}
//           >
//             {FilterTabs.map((tab) => (
//               <Tab
//                 key={tab.name}
//                 tab={tab}
//                 isFilterTab
//                 // isActive=""  as per chat gpt  modified this line
//                 isActive={activeFilterTab[tab.name]}
//                 handleClick={() => handleActiveFilterTab(tab.name)}
//               />

//             ))}
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   )
// };

// export default Customizer





// ----Code with AI Picker --------------------------------

// import React, { useState, useEffect } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';
// import { useSnapshot } from 'valtio';

// import config from '../config/config';
// import state from '../store';
// import { download } from '../assets';
// import { downloadCanvasToImage, render } from '../config/helpers';
// import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
// import { fadeAnimation, slideAnimation } from '../config/motion';
// import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';

// const Customizer = () => {
//   const snap = useSnapshot(state);

//   const [file, setFile] = useState('');

//   const [prompt, setPrompt] = useState('');
//   const [generatingImg, setGeneratingImg] = useState(false);

//   const [activeEditorTab, setActiveEditorTab] = useState('');
//   const [activeFilterTab, setActiveFilterTab] = useState({
//     logoShirt: true,
//     stylishShirt: false,
//   });

//   const generateTabContent = () => {
//     switch (activeEditorTab) {
//       case 'colorpicker':
//         return <ColorPicker />;
//       case 'filepicker':
//         return (
//           <FilePicker
//             file={file}
//             setFile={setFile}
//             readFile={readFile}
//           />
//         );
//       case 'aipicker':
//         return (
//           <AIPicker
//             prompt={prompt}
//             setPrompt={setPrompt}
//             generatingImg={generatingImg}
//             handleSubmit={handleSubmit}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   const handleSubmit = async (type) => {
//     if (!prompt) return alert('Please enter a prompt');

//     try {
//       setGeneratingImg(true);

//       // Call the backend API to generate an AI image
//       const response = await fetch(config.development.backendUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           prompt,
//         }),
//       });

//       const data = await response.json();

//       // Handle the generated AI image
//       handleDecals(type, `data:image/png;base64,${data.photo}`);
//     } catch (error) {
//       alert('Something went wrong');
//       console.error(error);
//     } finally {
//       setGeneratingImg(false);
//       setActiveEditorTab('');
//     }
//   };

//   const handleDecals = (type, result) => {
//     const decalType = DecalTypes[type];

//     // Update the state with the generated image
//     state[decalType.stateProperty] = result;

//     if (!activeFilterTab[decalType.filterTab]) {
//       handleActiveFilterTab(decalType.filterTab);
//     }
//   };

//   const handleActiveFilterTab = (tabName) => {
//     switch (tabName) {
//       case 'logoShirt':
//         state.isLogoTexture = !activeFilterTab[tabName];
//         break;
//       case 'stylishShirt':
//         state.isFullTexture = !activeFilterTab[tabName];
//         break;
//       default:
//         state.isLogoTexture = true;
//         state.isFullTexture = false;
//     }

//     // After setting the state, update activeFilterTab
//     setActiveFilterTab((prevState) => ({
//       ...prevState,
//       [tabName]: !prevState[tabName],
//     }));
//   };

//   const readFile = (type) => {
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         handleDecals(type, reader.result);
//         setActiveEditorTab('');
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <AnimatePresence>
//       {!snap.intro && (
//         <>
//           <motion.div
//             key="custom"
//             className="absolute top-0 left-0 z-10"
//             {...slideAnimation('left')}
//           >
//             <div className="flex items-center min-h-screen">
//               <div className="editortabs-container tabs">
//                 {EditorTabs.map((tab) => (
//                   <Tab
//                     key={tab.name}
//                     tab={tab}
//                     handleClick={() => setActiveEditorTab(tab.name)}
//                   />
//                 ))}
//                 {generateTabContent()}
//               </div>
//             </div>
//           </motion.div>

//           <motion.div
//             className="absolute z-10 top-5 right-5"
//             {...fadeAnimation}
//           >
//             <CustomButton
//               type="filled"
//               title="Go Back"
//               handleClick={() => (state.intro = true)}
//               customStyles="w-fit px-4 py-2.5 font-bold text-sm"
//             />
//           </motion.div>

//           <motion.div
//             className="filtertabs-container"
//             {...slideAnimation('up')}
//           >
//             {FilterTabs.map((tab) => (
//               <Tab
//                 key={tab.name}
//                 tab={tab}
//                 isFilterTab
//                 isActive={activeFilterTab[tab.name]}
//                 handleClick={() => handleActiveFilterTab(tab.name)}
//               />
//             ))}
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default Customizer;



// ---------------------------------------------------------------------------------


import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import state from '../store';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { ColorPicker, CustomButton, FilePicker, Tab } from '../components';

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState('');

  const [activeEditorTab, setActiveEditorTab] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />;
      case 'filepicker':
        return (
          <FilePicker
            file={file}
            setFile={setFile}
            readFile={readFile}
          />
        );
      default:
        return null;
    }
  };

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
    }

    setActiveFilterTab((prevState) => ({
      ...prevState,
      [tabName]: !prevState[tabName],
    }));
  };

  const readFile = (type) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleDecals(type, reader.result);
        setActiveEditorTab('');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.filter((tab) => tab.name !== 'aipicker').map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            // Remove the AI icon by removing the `icon` prop
            // icon="ai-icon"
            />
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...slideAnimation('up')}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActive={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
