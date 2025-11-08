import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea} from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton";

interface FileInfo {
  file_name: string;
}
interface PS {
  type:string,
  dive:string
}

export default function ResearchDive(){


    const {connected,publicKey}=useWallet();
    const [hasFile,sethasFile]=useState(false);
    const [files,setFiles]=useState<FileInfo[]>([]);
    const [selectedFiles, setSelectedFiles] =useState<FileInfo[]>([]);
    const [filestoWork, setFilestoWork] =useState<string[]>([]);
    //const [result,setResult]=useState("");
    const [problems,setProblems]=useState<PS[]>([]);
    const [loading,setLoading]=useState(false)



    const getPoints=async ()=>{

    const request=await fetch("https://junaidb-askdocs.hf.space/checkdive",{

      mode:"cors",
      method:"POST",
      body:JSON.stringify({
        owner:publicKey?.toBase58(),
        msg_type:"research",
        files:filestoWork

      }),
      headers:{
        "content-type":"application/json"
      }
    })
    const response=await request.json()
     if (response.dive) {
      setProblems(response.dive);
  }

  }

    const LegalProblems=async ()=> {

  setLoading(true);
  try {
    const request = await fetch("https://junaidb-askdocs.hf.space/researchdeepdive", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        owner: publicKey?.toBase58(),
        files: filestoWork,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    await request.json(); // wait for backend response

    // ✅ Always fetch updated breakdowns
    await getPoints();

    toast("Problems identified");
  } catch (err) {
    console.error("Error running breakdown:", err);
    toast("Error while analyzing documents");
  } finally {
    // ✅ Always stop loading no matter what
    setLoading(false);
  }
     

      }

     useEffect(() => {
        const checkFileExistence = async () => {

        try {
            const response = await fetch('https://junaidb-askdocs.hf.space/checkfile', {
        
            method: 'POST',
            mode:"cors",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                owner:publicKey?.toBase58(),
                filetype:"research"
            })
            });

        if (!response.ok) {
          throw new Error('Failed to check file');
        }

        const data = await response.json();
        sethasFile(data.status);
        
        // ✅ If files exist, fetch them and enable chat
        if (data.status === true && data.files) {
            setFiles(data.files);
        }
        
      } catch (err) {
        console.log(err)
      } 
    };

    if (connected) {
        checkFileExistence();
    }
  }, [connected]); 

  
  
  useEffect(() => {
    getPoints();
  }, [connected, publicKey]);




    return (
    <div>
    <main className="p-8 border border-gray-700 rounded-2xl bg-gray-800/30 backdrop-blur-sm shadow-xl">
    <h3 className="text-xl font-semibold text-white mb-4">Answers to your questions before you even  think </h3>
    <div className="flex justify-center items-start gap-8 w-full max-w-5xl">
    <section className="w-1/2">
        
        
             {hasFile ? (
  <section className="space-y-6">
    {/* File Selection List */}
    <div className="space-y-2">
      {files && files.length > 0 && files.map((file) => (
        <div key={file.file_name} className="flex items-center gap-2">
          <Checkbox 
            id={file.file_name}
            checked={selectedFiles.some(f => f.file_name === file.file_name)}
            onCheckedChange={(checked) => {
              if (checked === true) {
                setSelectedFiles(prev => [...prev, file]);
                setFilestoWork(prev=>[...prev,file.file_name]);
              } else {
                setSelectedFiles(prev => prev.filter(f => f.file_name !== file.file_name));
                 setFilestoWork(prev => prev.filter(f => f !== file.file_name));
                
              }
            }}
          />
          <label 
            htmlFor={file.file_name}
            className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {file.file_name}
          </label>
        </div>
      ))}
    </div>

    {/* Upload More Documents Section */}
    <Button
    onClick={LegalProblems}
    >
        Get Answers to questions before you think 
    </Button>
  
  </section>
) : (
  <section>
    
    <p className="font-mono text-indigo-500">no files to analyze</p>
    
  </section>
)}







    </section>
    <section className="w-1/2">
   
       {loading?
    
    
    (<section>



<Skeleton className="h-[20px] w-[100px] rounded-full" />




    </section>):
    
    
    (<section>

      
      <ScrollArea className="h-[60vh] w-full max-w-[900px] mx-auto rounded-xl border border-gray-800 bg-gray-900/70 p-6 shadow-lg backdrop-blur-sm overflow-y-auto">
  {hasFile && problems?.length > 0 ? (
    <section className="space-y-6">
      {problems.map((item, index) => (
         <div
          key={index}
          className="text-sm rounded-xl border border-gray-700 bg-gray-800/60 p-5 text-gray-100 font-mono leading-relaxed shadow-sm hover:shadow-md transition-shadow"
          dangerouslySetInnerHTML={{
            __html: item.dive
              .replace(/\*\*(.*?)\*\*/g, "<strong class='text-blue-400'>$1</strong>")
              .replace(/- /g, "• ")
              .replace(/\n/g, "<br/>"),
          }}
        />
      ))}
    </section>
  ) : (
    <section className="flex flex-col items-center justify-center h-full text-gray-400 italic">
      Identified key problems will appear here
    </section>
  )}
</ScrollArea>

    </section>)}
     
    </section>
    </div>
</main>
</div>
)

}