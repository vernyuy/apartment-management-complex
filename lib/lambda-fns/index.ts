exports.handler = async (event: any) => {
    console.log('request:', JSON.stringify(event));
  
    // switch (event.info.fieldName) {
    //   case "getItem":
    //     return getItem(event.arguments.id);
    //   case "createItem":
    //     return createItem(event.arguments.name, event.arguments.description);
    //   default:
    //     return null;
    // }

    return true
  };
  
  const items: { [key: string]: { id: string, name: string, description?: string } } = {};
  
  const getItem = (id: string) => {
    return {
        message: "hello"
    };
  };
  
  const createItem = (name: string, description?: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newItem = { id, name, description };
    items[id] = newItem;
    return newItem;
  };
  