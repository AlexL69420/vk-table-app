import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LOCAL_API_URL } from "../environment";
import { Header } from "../components/Header";
import { MyFooter } from "../components/Footer";

const ALLOWED_STATUSES = ["active", "inactive"];
const ALLOWED_POSITIONS = [
  "Senior Developer",
  "UX Designer",
  "Product Manager",
  "Junior Developer",
  "CTO",
  "DevOps Engineer",
  "Team Lead",
];
const ALLOWED_SKILLS = [
  "React",
  "TypeScript",
  "Node.js",
  "Figma",
  "UI/UX",
  "Prototyping",
  "Agile",
  "Scrum",
  "Product Roadmaps",
  "JavaScript",
  "HTML/CSS",
  "Vue.js",
  "Leadership",
  "Architecture",
  "Strategic Planning",
  "Docker",
  "AWS",
];

export default function CreateUserForm() {
  const navigate = useNavigate();

  // Состояния для каждого поля
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("active");
  const [skills, setSkills] = useState<string[]>([]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSkillChange = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format";
    if (!age) newErrors.age = "Age is required";
    if (Number(age) < 18 || Number(age) > 100)
      newErrors.age = "Age must be between 18 and 100";
    if (!position) newErrors.position = "Position is required";
    if (!salary) newErrors.salary = "Salary is required";
    if (Number(salary) < 0) newErrors.salary = "Salary cannot be negative";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!phone.trim()) newErrors.phone = "Phone is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const userToCreate = {
        name,
        email,
        age: Number(age),
        position,
        salary: Number(salary),
        address,
        phone,
        status,
        skills,
      };

      await axios.post(`${LOCAL_API_URL}/users`, userToCreate);
      navigate("/");
    } catch (error) {
      console.error("Error creating user:", error);
      setErrors({ submit: "Failed to create user. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col gap-2 dark:bg-slate-700">
      <Header />
      <div className="container mx-auto max-w-2xl px-4 py-8 dark:bg-slate-900">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-700 transition-colors hover:cursor-pointer hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>

            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            Create New User
          </h1>
          <div className="w-24"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Имя */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Name*
              </label>
              <input
                type="text"
                title="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full rounded-lg border px-4 py-2 text-slate-800 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 ${
                  errors.name
                    ? "border-red-500 dark:border-red-500"
                    : "border-slate-300"
                }`}
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Email*
              </label>
              <input
                type="email"
                title="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded-lg border px-4 py-2 text-slate-800 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 ${
                  errors.email
                    ? "border-red-500 dark:border-red-500"
                    : "border-slate-300"
                }`}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Возраст */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Age*
              </label>
              <input
                type="number"
                title="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="18"
                max="100"
                className={`w-full rounded-lg border px-4 py-2 text-slate-800 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 ${
                  errors.age
                    ? "border-red-500 dark:border-red-500"
                    : "border-slate-300"
                }`}
                disabled={isSubmitting}
              />
              {errors.age && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                  {errors.age}
                </p>
              )}
            </div>

            {/* Должность */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Position*
              </label>
              <select
                value={position}
                title="position"
                onChange={(e) => setPosition(e.target.value)}
                className={`w-full rounded-lg border px-4 py-2 text-slate-800 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 ${
                  errors.position
                    ? "border-red-500 dark:border-red-500"
                    : "border-slate-300"
                }`}
                disabled={isSubmitting}
              >
                <option value="">Select position</option>
                {ALLOWED_POSITIONS.map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>
              {errors.position && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                  {errors.position}
                </p>
              )}
            </div>

            {/* Зарплата */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Salary*
              </label>
              <input
                type="number"
                title="salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className={`w-full rounded-lg border px-4 py-2 text-slate-800 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 ${
                  errors.salary
                    ? "border-red-500 dark:border-red-500"
                    : "border-slate-300"
                }`}
                disabled={isSubmitting}
              />
              {errors.salary && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                  {errors.salary}
                </p>
              )}
            </div>

            {/* Статус */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Status
              </label>
              <div className="flex space-x-4">
                {ALLOWED_STATUSES.map((statusOption) => (
                  <label
                    key={statusOption}
                    className="flex items-center text-slate-700 dark:text-slate-300"
                  >
                    <input
                      type="radio"
                      name="status"
                      value={statusOption}
                      checked={status === statusOption}
                      onChange={(e) => setStatus(e.target.value)}
                      className="mr-2 h-4 w-4 text-emerald-500 focus:ring-emerald-500 dark:border-slate-600 dark:bg-slate-700 dark:focus:ring-emerald-600"
                      disabled={isSubmitting}
                    />
                    {statusOption.charAt(0).toUpperCase() +
                      statusOption.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            {/* Адрес */}
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Address*
              </label>
              <input
                type="text"
                title="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`w-full rounded-lg border px-4 py-2 text-slate-800 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 ${
                  errors.address
                    ? "border-red-500 dark:border-red-500"
                    : "border-slate-300"
                }`}
                disabled={isSubmitting}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                  {errors.address}
                </p>
              )}
            </div>

            {/* Телефон */}
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Phone*
              </label>
              <input
                type="tel"
                title="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full rounded-lg border px-4 py-2 text-slate-800 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 ${
                  errors.phone
                    ? "border-red-500 dark:border-red-500"
                    : "border-slate-300"
                }`}
                disabled={isSubmitting}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Навыки */}
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Skills
              </label>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {ALLOWED_SKILLS.map((skill) => (
                  <label
                    key={skill}
                    className="flex items-center text-slate-700 dark:text-slate-300"
                  >
                    <input
                      type="checkbox"
                      checked={skills.includes(skill)}
                      onChange={() => handleSkillChange(skill)}
                      className="mr-2 h-4 w-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500 dark:border-slate-600 dark:bg-slate-700 dark:focus:ring-emerald-600"
                      disabled={isSubmitting}
                    />
                    {skill}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {errors.submit && (
            <p className="text-sm text-red-500 dark:text-red-400">
              {errors.submit}
            </p>
          )}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 transition-colors hover:cursor-pointer hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-emerald-500 px-4 py-2 text-white transition-colors hover:cursor-pointer hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-emerald-800 dark:hover:bg-emerald-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating...
                </span>
              ) : (
                "Create User"
              )}
            </button>
          </div>
        </form>
      </div>
      <MyFooter />
    </main>
  );
}
