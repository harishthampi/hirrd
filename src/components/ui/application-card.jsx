import { Boxes, BriefcaseBusiness, Download, School } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { updateApplicationStatus } from "@/api/apiApplications";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";



const ApplicationCard = ({ application, isCandidate = false }) => {
  const handleDownload = () => {
    const link = document.createElement("a"); // Create a new <a> element
    link.href = application?.resume; // Set the href attribute to the resume URL
    link.target = "_blank"; // Open the link in a new tab
    link.click(); // Click the link
  };

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateApplicationStatus,
    {
      job_id: application.job_id,
    }
  );

  const handleStatusChange = (status) => {
    fnHiringStatus(status);
  };
  return (
    <Card>
      {loadingHiringStatus && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {isCandidate
            ? `Application for ${application?.job?.title} at ${application?.job?.company?.name}`
            : application?.name}
          <Download
            size={18}
            className="bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer"
            onClick={handleDownload}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex gap-2 items-center">
            <BriefcaseBusiness size={15} />
            {application?.experience} years of experience
          </div>
          <div className="flex gap-2 items-center">
            <School size={15} />
            {application?.education}
          </div>
          <div className="flex gap-2 items-center">
            <Boxes size={15} />
            {application?.skills}
          </div>
        </div>
        <hr />
      </CardContent>
      <CardFooter className="flex justify-between">
        <span>{new Date(application?.created_at).toLocaleString()}</span>
        {isCandidate ? (
          <span className="capitalize font-bold">
            {" "}
            Status : {application?.status}
          </span>
        ) : (
          <Select
            onValueChange={handleStatusChange} defaultValue={application?.status}
          >
            <SelectTrigger className='w-52'>
              <SelectValue placeholder="Application Status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem  value="applied">Applied</SelectItem>
                <SelectItem  value="interviewing">Interviewing</SelectItem>
                <SelectItem  value="hired">Hired</SelectItem>
                <SelectItem  value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
