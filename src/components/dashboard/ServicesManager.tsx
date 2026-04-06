import { useState } from "react";
import {
  useAdminServices,
  useCreateService,
  useDeleteService,
  useUpdateService,
} from "@/hooks/useAdminServices";

const ServicesManager = () => {
  const { data: services, isLoading, error } = useAdminServices();
  const createMutation = useCreateService();
  const updateMutation = useUpdateService();
  const deleteMutation = useDeleteService();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);

  const resetForm = () => {
    setName("");
    setPrice("");
    setDuration("");
    setDescription("");
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name,
      price: Number(price),
      duration_minutes: Number(duration),
      description,
    };

    if (editingId) {
      await updateMutation.mutateAsync({
        id: editingId,
        data: payload,
      });
    } else {
      await createMutation.mutateAsync(payload);
    }

    resetForm();
  };

  const handleEdit = (service: any) => {
    setEditingId(service.id);
    setName(service.name);
    setPrice(String(service.price));
    setDuration(String(service.duration_minutes));
    setDescription(service.description || "");
  };

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);

    if (editingId === id) {
      resetForm();
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-2">Service Manager</h2>
      <p className="text-gray-600 mb-6">
        Add, edit, and remove services. Changes appear on the public website.
      </p>

      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 mb-8">
        <input
          type="text"
          placeholder="Service name"
          className="rounded-xl border px-4 py-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          className="rounded-xl border px-4 py-3"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Duration in minutes"
          className="rounded-xl border px-4 py-3"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Description"
          className="rounded-xl border px-4 py-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="md:col-span-2 flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-black text-white px-5 py-3"
          >
            {editingId
              ? updateMutation.isPending
                ? "Saving..."
                : "Save Changes"
              : createMutation.isPending
              ? "Adding..."
              : "Add Service"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border px-5 py-3"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {isLoading && <p>Loading services...</p>}
      {error && <p className="text-red-500">Failed to load services.</p>}

      {!isLoading && !error && (
        <div className="space-y-4">
          {services?.map((service: any) => (
            <div
              key={service.id}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-xl border p-4"
            >
              <div>
                <h3 className="font-semibold text-lg">{service.name}</h3>
                <p className="text-sm text-gray-600">
                  €{service.price} · {service.duration_minutes} min
                </p>
                {service.description && (
                  <p className="text-sm text-gray-500 mt-1">
                    {service.description}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="rounded-xl border px-4 py-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(service.id)}
                  disabled={deleteMutation.isPending}
                  className="rounded-xl border px-4 py-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {services?.length === 0 && (
            <p className="text-gray-500">No services found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ServicesManager;