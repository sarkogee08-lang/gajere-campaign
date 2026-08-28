import VolunteerTable from "@/components/admin/VolunteerTable";

export default function VolunteersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Volunteers
        </h1>

        <p className="mt-1 text-gray-500">
          View, search and manage registered campaign volunteers.
        </p>
      </div>

      <VolunteerTable />
    </div>
  );
}
