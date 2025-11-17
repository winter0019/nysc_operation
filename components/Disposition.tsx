import React, { useState, useMemo } from 'react';
import { LGA, CorpsMemberBatch, CorpsMember } from '../types';
import ChevronDownIcon from './icons/ChevronDownIcon';
import Button from './common/Button';
import Modal from './common/Modal';
import Input from './common/Input';
import Select from './common/Select';
import PlusIcon from './icons/PlusIcon';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';


interface DispositionProps {
  lga: LGA;
}

const MOCK_BATCHES: CorpsMemberBatch[] = [
    { 
        id: '1', 
        batch: '2024 Batch B Stream 1', 
        members: [
            { id: 'cm1', name: 'Adewale Adeyemi', gender: 'Male', ppa: 'Government Secondary School, Daura' },
            { id: 'cm2', name: 'Fatima Bello', gender: 'Female', ppa: 'General Hospital, Daura' },
            { id: 'cm3', name: 'Chukwudi Okoro', gender: 'Male', ppa: 'Daura LGA Secretariat' },
        ] 
    },
    { 
        id: '2', 
        batch: '2024 Batch A Stream 2', 
        members: [
            { id: 'cm4', name: 'Ngozi Eze', gender: 'Female', ppa: 'Community Primary School, Sandamu' },
            { id: 'cm5', name: 'Musa Ibrahim', gender: 'Male', ppa: 'Sandamu Local Government Council' },
        ] 
    },
    { 
        id: '3', 
        batch: '2024 Batch A Stream 1', 
        members: [
            { id: 'cm6', name: 'Olamide Bakare', gender: 'Female', ppa: 'Government Secondary School, Daura' },
            { id: 'cm7', name: 'Tariq Al-Hassan', gender: 'Male', ppa: 'Federal Polytechnic, Daura' },
            { id: 'cm8', name: 'Amina Yusuf', gender: 'Female', ppa: 'General Hospital, Daura' },
            { id: 'cm9', name: 'David Joshua', gender: 'Male', ppa: 'Community Primary School, Sandamu' },
        ] 
    },
];

const Disposition: React.FC<DispositionProps> = ({ lga }) => {
    const [batches, setBatches] = useState<CorpsMemberBatch[]>(MOCK_BATCHES);
    const [expandedBatchId, setExpandedBatchId] = useState<string | null>(MOCK_BATCHES[0]?.id || null);
    
    // State for modals
    const [isAddBatchModalOpen, setAddBatchModalOpen] = useState(false);
    const [newBatchName, setNewBatchName] = useState('');
    const [isMemberModalOpen, setMemberModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<Partial<CorpsMember> | null>(null);
    const [activeBatchId, setActiveBatchId] = useState<string | null>(null);

    const handleToggleBatch = (batchId: string) => {
        setExpandedBatchId(prevId => (prevId === batchId ? null : batchId));
    };
    
    const totalCorpsMembers = useMemo(() => {
        return batches.reduce((acc, batch) => acc + batch.members.length, 0);
    }, [batches]);

    // Batch Management
    const handleAddBatch = () => {
        if (!newBatchName.trim()) {
            alert('Batch name cannot be empty.');
            return;
        }
        const newBatch: CorpsMemberBatch = {
            id: new Date().toISOString(),
            batch: newBatchName,
            members: [],
        };
        setBatches([newBatch, ...batches]);
        setNewBatchName('');
        setAddBatchModalOpen(false);
        setExpandedBatchId(newBatch.id);
    };

    // Member Management
    const openMemberModal = (batchId: string, member: CorpsMember | null = null) => {
        setActiveBatchId(batchId);
        setEditingMember(member || { name: '', gender: 'Male', ppa: '' });
        setMemberModalOpen(true);
    };

    const handleSaveMember = () => {
        if (!editingMember || !activeBatchId) return;

        const { id, name, gender, ppa } = editingMember;

        if (!name?.trim() || !ppa?.trim()) {
            alert('Name and PPA are required.');
            return;
        }

        setBatches(prevBatches => prevBatches.map(batch => {
            if (batch.id === activeBatchId) {
                if (id) { // Editing existing member
                    return {
                        ...batch,
                        members: batch.members.map(m => m.id === id ? { ...m, name, gender: gender || 'Male', ppa } : m)
                    };
                } else { // Adding new member
                    const newMember: CorpsMember = { id: new Date().toISOString(), name, gender: gender || 'Male', ppa };
                    return { ...batch, members: [...batch.members, newMember] };
                }
            }
            return batch;
        }));

        setMemberModalOpen(false);
        setEditingMember(null);
        setActiveBatchId(null);
    };

    const handleDeleteMember = (batchId: string, memberId: string) => {
        if (window.confirm('Are you sure you want to delete this corps member?')) {
            setBatches(prevBatches => prevBatches.map(batch => {
                if (batch.id === batchId) {
                    return { ...batch, members: batch.members.filter(m => m.id !== memberId) };
                }
                return batch;
            }));
        }
    };


  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-800">Corps Members Disposition</h2>
                <p className="text-sm text-gray-500">Manage batches and corps members in {lga.name}</p>
            </div>
            <div className="flex space-x-2">
                <div className="text-right">
                    <p className="text-xl font-bold text-green-700">{totalCorpsMembers}</p>
                    <p className="text-sm text-gray-500">Total Corps Members</p>
                </div>
                 <Button onClick={() => setAddBatchModalOpen(true)} icon={<PlusIcon className="h-4 w-4" />}>
                    Add Batch
                </Button>
            </div>
        </div>
      
        <div className="space-y-4">
            {batches.map((batch) => {
                const isExpanded = expandedBatchId === batch.id;
                const maleCount = batch.members.filter(m => m.gender === 'Male').length;
                const femaleCount = batch.members.filter(m => m.gender === 'Female').length;

                return (
                    <div key={batch.id} className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300">
                        <button 
                            className="w-full p-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 focus:outline-none"
                            onClick={() => handleToggleBatch(batch.id)}
                            aria-expanded={isExpanded}
                            aria-controls={`batch-content-${batch.id}`}
                        >
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">{batch.batch}</h3>
                                <p className="text-sm text-gray-600">
                                    Total: <span className="font-bold">{batch.members.length}</span> | Male: {maleCount}, Female: {femaleCount}
                                </p>
                            </div>
                            <ChevronDownIcon className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {isExpanded && (
                            <div id={`batch-content-${batch.id}`} className="p-4 border-t border-gray-200">
                                <div className="flex justify-end mb-4">
                                    <Button onClick={() => openMemberModal(batch.id)} icon={<PlusIcon className="h-4 w-4" />}>
                                        Add Member
                                    </Button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="p-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                                                <th className="p-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Gender</th>
                                                <th className="p-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Place of Primary Assignment (PPA)</th>
                                                <th className="p-3 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {batch.members.length > 0 ? batch.members.map((member) => (
                                                <tr key={member.id} className="border-b hover:bg-gray-50">
                                                    <td className="p-3 text-sm">{member.name}</td>
                                                    <td className="p-3 text-sm">{member.gender}</td>
                                                    <td className="p-3 text-sm">{member.ppa}</td>
                                                    <td className="p-3 text-sm">
                                                        <div className="flex justify-center items-center space-x-2">
                                                             <Button variant="secondary" onClick={() => openMemberModal(batch.id, member)} icon={<PencilIcon className="h-4 w-4" />} className="p-2">
                                                                <span className="sr-only">Edit</span>
                                                            </Button>
                                                            <Button variant="danger" onClick={() => handleDeleteMember(batch.id, member.id)} icon={<TrashIcon className="h-4 w-4" />} className="p-2">
                                                                 <span className="sr-only">Delete</span>
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan={4} className="text-center p-4 text-gray-500">No corps members in this batch yet.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>

        {/* Add Batch Modal */}
        <Modal isOpen={isAddBatchModalOpen} onClose={() => setAddBatchModalOpen(false)} title="Add New Batch">
            <div className="space-y-4">
                <Input
                    label="Batch Name"
                    id="batchName"
                    type="text"
                    value={newBatchName}
                    onChange={(e) => setNewBatchName(e.target.value)}
                    placeholder="e.g., 2025 Batch A Stream 1"
                    required
                />
                <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="secondary" onClick={() => setAddBatchModalOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddBatch}>Save Batch</Button>
                </div>
            </div>
        </Modal>

        {/* Add/Edit Member Modal */}
        <Modal isOpen={isMemberModalOpen} onClose={() => setMemberModalOpen(false)} title={editingMember?.id ? 'Edit Corps Member' : 'Add New Corps Member'}>
             <div className="space-y-4">
                <Input
                    label="Full Name"
                    id="memberName"
                    value={editingMember?.name || ''}
                    onChange={(e) => setEditingMember(prev => ({...prev, name: e.target.value}))}
                    required
                />
                <Select
                    label="Gender"
                    id="memberGender"
                    value={editingMember?.gender || 'Male'}
                    onChange={(e) => setEditingMember(prev => ({...prev, gender: e.target.value as 'Male' | 'Female'}))}
                    options={[
                        { value: 'Male', label: 'Male' },
                        { value: 'Female', label: 'Female' },
                    ]}
                />
                <Input
                    label="Place of Primary Assignment (PPA)"
                    id="memberPPA"
                    value={editingMember?.ppa || ''}
                    onChange={(e) => setEditingMember(prev => ({...prev, ppa: e.target.value}))}
                    required
                />
                 <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="secondary" onClick={() => setMemberModalOpen(false)}>Cancel</Button>
                    <Button onClick={handleSaveMember}>Save Member</Button>
                </div>
            </div>
        </Modal>
    </div>
  );
};

export default Disposition;