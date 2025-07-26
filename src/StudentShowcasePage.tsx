// Self-contained student showcase page with animation
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import HeroSection from './HeroSection';
import FooterSection from './FooterSection';
import PortfolioHero from './PortfolioHero';

// Student type
interface Student {
  id: string;
  name: string;
  college: string;
  passingOutYear: string;
  github: string;
  portfolio: string;
  photo: string;
  role: 'DevOps Engineer' | 'ML Engineer' | 'Full-Stack Web Developer';
  availability: ('Full-Time' | 'Part-Time')[];
}
export type RoleFilter = 'All' | 'DevOps Engineer' | 'ML Engineer' | 'Full-Stack Web Developer';
export type AvailabilityFilter = 'All' | 'Full-Time' | 'Part-Time';

// Student data (filtered)
const studentsData: Student[] = [
  {
    id: '290',
    name: 'Pushpendra Baswal',
    college: 'JECRC UNIVERSITY',
    passingOutYear: '2026',
    github: 'https://github.com/Pushpendra1001',
    portfolio: 'https://hello-pushpendrabaswal.vercel.app/',
    photo: '/assets/students/pushpendra.jpg',
    role: 'DevOps Engineer',
    availability: ['Full-Time']
  },
  {
    id: '10',
    name: 'Satvik Dubey',
    college: 'NRI Institute Of Information Science And Technology',
    passingOutYear: '2025',
    github: 'https://github.com/Dubeysatvik123',
    portfolio: 'https://satvik-dubey.netlify.app',
    photo: '/assets/students/Satvik Dubey.jpg',
    role: 'DevOps Engineer',
    availability: ['Full-Time']
  },
  {
    id: '32',
    name: 'Anmol Gupta',
    college: 'Vivekananda Global University',
    passingOutYear: '2026',
    github: 'https://github.com/anmolgupta3678',
    portfolio: 'https://melodic-snickerdoodle-080a6a.netlify.app',
    photo: '/assets/students/Anmol Gupta.jpg',
    role: 'DevOps Engineer',
    availability: ['Full-Time']
  },
  {
    id: '120',
    name: 'Hardik Gothwal',
    college: 'Poornima college of engineering',
    passingOutYear: '2026',
    github: 'https://github.com/hardik0501',
    portfolio: 'https://hardikresume.netlify.app/',
    photo: '/assets/students/Hardik Gothwal.jpg',
    role: 'DevOps Engineer',
    availability: ['Full-Time']
  },
  {
    id: '286',
    name: 'Raju Jain',
    college: 'Vit Jaipur',
    passingOutYear: '2026',
    github: 'https://github.com/raj85410',
    portfolio: 'https://rajupotfolio.vercel.app/',
    photo: '/assets/students/Raj Jain.jpg',
    role: 'DevOps Engineer',
    availability: ['Full-Time']
  },
  {
    id: '35',
    name: 'Jayant Bhati',
    college: 'Arya College of Engineering and IT',
    passingOutYear: '2025',
    github: 'https://github.com/jayant77778',
    portfolio: 'https://portfolio01-lake-eight.vercel.app/',
    photo: '/assets/students/Jayant Bhati.jpg',
    role: 'DevOps Engineer',
    availability: ['Full-Time']
  },
  {
    id: '259',
    name: 'Mayank Jangir',
    college: 'Poornima college of engineering',
    passingOutYear: '2026',
    github: 'https://github.com/mayankjangir23',
    portfolio: 'https://mayankjangir.netlify.app/',
    photo: '/assets/students/Mayank Jangir.jpg',
    role: 'DevOps Engineer',
    availability: ['Full-Time']
  },
  {
    id: '319',
    name: 'Bhavya Jain',
    college: 'Vivekanand Global University',
    passingOutYear: '2026',
    portfolio: '*',
    github: 'https://github.com/BHAVYA-a28',
    role: 'Full-Stack Web Developer',
    photo: '/assets/students/Bhavya Jain.jpg',
    availability: ['Full-Time']
  },
  {
    id: '18',
    name: 'Raghav Tiwari',
    college: 'Renaissance University',
    passingOutYear: '2025',
    github: 'https://github.com/raghavtiwari974',
    portfolio: 'https://delightful-ganache-615ef5.netlify.app/',
    photo: '/assets/students/Raghav Tiwari.png',
    role: 'DevOps Engineer',
    availability: ['Full-Time']
  },
  {
    id: '165',
    name: 'Bhavesh Suthar',
    college: 'Shri Jain PG College',
    passingOutYear: '2025',
    github: 'https://github.com/bhaveshsuthar-63777',
    portfolio: 'https://1bhaveshportfolio.netlify.app/',
    photo: '/assets/students/Bhavesh Suthar.jpg',
    role: 'DevOps Engineer',
    availability: ['Full-Time']
  },
  {
    id: '198',
    name: 'Sheetal Saini',
    college: 'Swami Vivekanand Harda, Madhya Pradesh',
    passingOutYear: '2025',
    github: 'https://github.com/sheetal-saini25',
    portfolio: 'https://www.linkedin.com/in/sheetal-saini-b33273371',
    photo: '/assets/students/Sheetal Saini.jpg',
    role: 'ML Engineer',
    availability: ['Full-Time']
  },
  {
    id: '5',
    name: 'Karvy Goyel',
    college: 'VIPS , GGSIPU',
    passingOutYear: '2026',
    github: 'https://github.com/Karvy192003',
    portfolio: 'https://karvy19.netlify.app/',
    photo: '/assets/students/Karvy Goyel.jpg',
    role: 'DevOps Engineer',
    availability: ['Full-Time']
  }
];

// StudentCard component
const StudentCard: React.FC<{ student: Student; index: number }> = ({ student, index }) => {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-teal-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-pink-500',
  ];
  const colorClass = colors[index % colors.length];

  return (
    <div
      className={`relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 text-center group hover:-translate-y-3 hover:scale-105 transform overflow-hidden`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Decorative background elements */}
      <div className={`absolute top-0 right-0 w-20 h-20 ${colorClass} rounded-full opacity-20 transform translate-x-6 -translate-y-6 group-hover:scale-150 transition-transform duration-500`}></div>
      <div className={`absolute bottom-0 left-0 w-16 h-16 ${colorClass} rounded-full opacity-15 transform -translate-x-4 translate-y-4 group-hover:scale-125 transition-transform duration-500`}></div>

      <div className="relative mb-6">
        <img
          src={student.photo}
          alt={student.name}
          className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-500"
        />
        <div className={`absolute -bottom-2 -right-2 w-8 h-8 ${colorClass} rounded-full flex items-center justify-center shadow-lg group-hover:rotate-180 transition-transform duration-500`}>
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="12 2 15 8.5 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 9 8.5 12 2" /></svg>
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">{student.name}</h3>
      <p className="text-gray-600 text-sm mb-1 font-medium">{student.college}</p>
      <p className="text-gray-500 text-sm mb-2">Passing Year {student.passingOutYear}</p>
      <p className="text-blue-600 text-sm mb-2 font-semibold">{student.role}</p>
      <div className="flex justify-center gap-3 mt-2">
        <a href={student.github} target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-gray-800 p-3 rounded-full transition-all duration-300 group hover:scale-110 hover:rotate-12 shadow-md">
          <svg className="w-5 h-5 text-gray-800 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.48 2.87 8.28 6.84 9.63.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0112 6.8c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0022 12.26C22 6.58 17.52 2 12 2z" /></svg>
        </a>
        <a href={student.portfolio} target="_blank" rel="noopener noreferrer" className="bg-red-100 hover:bg-red-600 p-3 rounded-full transition-all duration-300 group hover:scale-110 hover:rotate-12 shadow-md">
          <svg className="w-5 h-5 text-red-600 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
        </a>
      </div>
    </div>
  );
};

// PortfolioGallery component
const PortfolioGallery: React.FC<{ students: Student[] }> = ({ students }) => (
  <section className="py-16 bg-gradient-to-b from-gray-50 to-white min-h-screen">
    <div className="max-w-7xl mx-auto px-4">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
          Meet Our <span className="text-red-500">Talented</span> Students
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore profiles of exceptional developers ready to join your team
        </p>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {students.map((student, index) => (
          <StudentCard key={student.id} student={student} index={index} />
        ))}
      </motion.div>
      {students.length === 0 && (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-black mb-2">No students found</h3>
          <p className="text-gray-600">Try adjusting your filters to see more results</p>
        </motion.div>
      )}
    </div>
  </section>
);

// FilterBar component
interface FilterBarProps {
  selectedRole: RoleFilter;
  selectedAvailability: AvailabilityFilter;
  onRoleChange: (role: RoleFilter) => void;
  onAvailabilityChange: (availability: AvailabilityFilter) => void;
}
const FilterBar: React.FC<FilterBarProps> = ({
  selectedRole,
  selectedAvailability,
  onRoleChange,
  onAvailabilityChange,
}) => {
  const roles: RoleFilter[] = ['All', 'DevOps Engineer', 'ML Engineer', 'Full-Stack Web Developer'];
  const availabilities: AvailabilityFilter[] = ['All', 'Full-Time', 'Part-Time'];
  return (
    <motion.div
      className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-red-500/20 shadow-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Role Filters */}
          <div className="flex-1">
            <h3 className="text-black font-semibold mb-3">Filter by Role</h3>
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <motion.button
                  key={role}
                  onClick={() => onRoleChange(role)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedRole === role
                      ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black border border-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {role}
                </motion.button>
              ))}
            </div>
          </div>
          {/* Availability Filters */}
          <div className="flex-1">
            <h3 className="text-black font-semibold mb-3">Filter by Availability</h3>
            <div className="flex flex-wrap gap-2">
              {availabilities.map((availability) => (
                <motion.button
                  key={availability}
                  onClick={() => onAvailabilityChange(availability)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedAvailability === availability
                      ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black border border-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {availability}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main export
const StudentShowcasePage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<RoleFilter>('All');
  const [selectedAvailability, setSelectedAvailability] = useState<AvailabilityFilter>('All');
  const filteredStudents = useMemo(() => {
    return studentsData.filter(student => {
      const roleMatch = selectedRole === 'All' || student.role === selectedRole;
      const availabilityMatch = selectedAvailability === 'All' || student.availability.includes(selectedAvailability as 'Full-Time' | 'Part-Time');
      return roleMatch && availabilityMatch;
    });
  }, [selectedRole, selectedAvailability]);
  return (
    <>
      <div style={{ position: 'relative' }}>
        <PortfolioHero />
        <button
          onClick={() => { window.location.href = '/'; }}
          style={{
            position: 'absolute',
            top: 24,
            left: 24,
            background: '#ef4444',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.6rem 1.4rem',
            fontWeight: 700,
            fontSize: '1rem',
            boxShadow: '0 2px 8px rgba(220,38,38,0.10)',
            cursor: 'pointer',
            transition: 'background 0.18s',
            zIndex: 50,
          }}
          onMouseOver={e => e.currentTarget.style.background = '#b91c1c'}
          onMouseOut={e => e.currentTarget.style.background = '#ef4444'}
        >
          ← Back to Hirex
        </button>
      </div>
      <FilterBar
        selectedRole={selectedRole}
        selectedAvailability={selectedAvailability}
        onRoleChange={setSelectedRole}
        onAvailabilityChange={setSelectedAvailability}
      />
      <PortfolioGallery students={filteredStudents} />
      <FooterSection />
    </>
  );
};

export default StudentShowcasePage; 