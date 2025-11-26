import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';

const Careers = () => {
  const navigate = useNavigate();

  const jobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      location: 'Remote',
      type: 'Full-time',
      description: 'Build beautiful and responsive web interfaces using React and modern CSS frameworks.',
      requirements: ['React.js expertise', 'UI/UX understanding', 'Git proficiency', '2+ years experience']
    },
    {
      id: 2,
      title: 'Backend Developer',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Design and maintain scalable backend systems and APIs using Node.js and MongoDB.',
      requirements: ['Node.js & Express', 'MongoDB/NoSQL', 'API design', '3+ years experience']
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      location: 'Remote',
      type: 'Full-time',
      description: 'Create intuitive and visually appealing user experiences for our e-commerce platform.',
      requirements: ['Figma expertise', 'Design systems knowledge', 'Prototyping skills', 'Portfolio required']
    },
    {
      id: 4,
      title: 'Product Manager',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'Lead product strategy and roadmap for our growing e-commerce platform.',
      requirements: ['Product management experience', 'Data analysis', 'Leadership skills', '5+ years experience']
    },
    {
      id: 5,
      title: 'QA Engineer',
      location: 'Remote',
      type: 'Full-time',
      description: 'Ensure quality and reliability of our applications through comprehensive testing.',
      requirements: ['Automated testing', 'Selenium/Jest', 'Bug tracking', '2+ years experience']
    },
    {
      id: 6,
      title: 'DevOps Engineer',
      location: 'Austin, TX',
      type: 'Full-time',
      description: 'Manage deployment, infrastructure, and CI/CD pipelines for our platform.',
      requirements: ['Docker & Kubernetes', 'CI/CD pipelines', 'AWS/Cloud platforms', '3+ years experience']
    }
  ];

  const handleApplyClick = () => {
    navigate('/contact');
  };

  return (
    <div className="pt-24 bg-gray-50 dark:bg-gray-900 min-h-screen pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-lg md:text-xl opacity-90">
            Be part of a dynamic team building the future of e-commerce
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Why Join Us */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Work With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="text-yellow-400 mb-4 text-3xl">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Work on cutting-edge technology and make a real impact on millions of users.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="text-yellow-400 mb-4 text-3xl">🤝</div>
              <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Join a diverse and talented team that values creativity and teamwork.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="text-yellow-400 mb-4 text-3xl">📈</div>
              <h3 className="text-xl font-semibold mb-2">Growth</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Develop your skills and grow your career with continuous learning opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Open Positions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {jobs.map(job => (
              <div key={job.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm">
                        <MapPin size={16} /> {job.location}
                      </span>
                      <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm">
                        <Clock size={16} /> {job.type}
                      </span>
                    </div>
                  </div>
                  <Briefcase className="text-yellow-400" size={24} />
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4">{job.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Requirements:</h4>
                  <ul className="space-y-1">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <span className="text-yellow-400">✓</span> {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <a onClick={handleApplyClick} className="inline-flex items-center gap-2 text-yellow-500 font-semibold hover:text-yellow-600 cursor-pointer transition">
                  Apply Now <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Application Form */}
        <section id="apply" className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
          <h2 className="text-3xl font-bold mb-8 text-center">Ready to Apply?</h2>
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
              To submit your job application, please use our contact form. Fill in your details and let us know which position you're interested in!
            </p>
            <button
              onClick={handleApplyClick}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 transition mx-auto"
            >
              Go to Application Form
            </button>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '💼', title: 'Competitive Salary', desc: 'Industry-leading compensation packages' },
              { icon: '🏥', title: 'Health Insurance', desc: 'Comprehensive medical and dental coverage' },
              { icon: '🏠', title: 'Remote Work', desc: 'Flexible work arrangements' },
              { icon: '📚', title: 'Learning Budget', desc: 'Annual training and development fund' },
              { icon: '🎉', title: 'Team Events', desc: 'Regular team outings and celebrations' },
              { icon: '⏰', title: 'Flexible Hours', desc: 'Work-life balance is important to us' }
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Careers;
