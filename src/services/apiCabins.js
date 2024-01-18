import supabase, { supabaseUrl } from "./supabase";


export async function uploadCabin(newCabin, id){
  const sameImage = newCabin.picture?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.picture.name}`.replaceAll("/", '');
  const imagePath = sameImage ? newCabin.picture : `${supabaseUrl}/storage/v1/object/public/cabin_images/${imageName}`;

  let query = supabase.from('Cabins')

  if (!id){
    query = query.insert([{...newCabin, picture: imagePath}]);
  }
  if (id) {
    query = query.update({ ...newCabin, picture: imagePath }).eq("id", id)
  }

  const { data, error } = await query.select().single();

  if(sameImage) return data;

  if(error){
    console.log(error);
    throw new Error(`API failed to insert new cabin to the database: "${error.message}"`);
  }

  const { storageError } = await supabase.storage.from('cabin_images').upload(imageName, newCabin.picture)
    
  if (storageError) {
      deleteCabin(newCabin.id)
      console.log(storageError);
      throw new Error(`API failed to insert new cabin to the database: "${error.message}"`);
  }

  return data
}


//////////////////////////////////////////////////////////////
//////// GET CABINS

async function getCabins(){  
    const { data, error } = await supabase
    .from('Cabins')
    .select('*');

    if(error){
        console.log(error);
        throw new Error('API failed to fetch Cabins from database');
    }

    return data
}

export default getCabins;

export async function deleteCabin(id){
    const { error } = await supabase.from('Cabins').delete().eq('id', id);
    if(error){
        console.log(`Unable to delete cabin from the database: ${error}`)
    }
}