import supabaseClient from "@/utils/superbase";

// Fetch Jobs
export async function getJobs(token, { location, company_id, searchQuery }) {
   const supabase = await supabaseClient(token);
   let query = supabase
     .from("jobs")
     .select("*, saved: saved_jobs(id), company: companies(name,logo_url)");
 
   if (location) {
     query = query.eq("location", location);
   }
 
   if (company_id) {
     query = query.eq("company_id", company_id);
   }
 
   if (searchQuery) {
     query = query.ilike("title", `%${searchQuery}%`);
   }
 
   const { data, error } = await query;   
 
   if (error) {
     console.error("Error fetching Jobs:", error);
     return null;
   }
 
   return data;
 }

 // Fetch Saved Jobs
 export async function saveJob(token, { alreadySaved }, saveData) {
  const supabase = await supabaseClient(token);
  if(alreadySaved){
     // If the job is already saved, remove it
    const { data, error:deleteError } = await supabase
    .from("saved_jobs")
    .delete()
    .eq("job_id", saveData.job_id);

      
    if (deleteError) {
      console.error("Error Deleting Saved Jobs:", deleteError);
      return data;
    }
    
    return data;
  }
  else{
     // If the job is not saved, add it to saved jobs
    const { data, error:insertError } = await supabase
    .from("saved_jobs")
    .insert([saveData])
    .select();

    if (insertError) {
      console.error("Error fetching Jobs:", insertError);
      return data;
    }

  return data;
  }
}

//Single Job

export async function getSingleJob(token,{job_id}){
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
  .from("jobs")
  .select("*, company: companies(name,logo_url),applications:applications(*)")//fetching all the applications for the job
  .eq("id", job_id)//fetching the job with the id
  .single();//fetching a single job

  if (error) {
    console.error("Error fetching Jobs:", error);
    return null;
  }

  return data;
}

//updateHiringStatus
export async function updateHiringStatus(token,{job_id},isOpen){
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
  .from("jobs")
  .update({isOpen})//updating the hiring status
  .eq("id", job_id)//fetching the job with the id
  .select();

  if (error) {
    console.error("Error Updating Jobs:", error);
    return null;
  }

  return data;
}

// Read Saved Jobs
export async function getSavedJobs(token) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("saved_jobs")
    .select("*, job: jobs(*, company: companies(name,logo_url))");

  if (error) {
    console.error("Error fetching Saved Jobs:", error);
    return null;
  }

  return data;
}