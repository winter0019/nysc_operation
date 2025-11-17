import React, { useState } from 'react';
import { LGA, CDGroup, CDSGroupMember } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';
import Input from './common/Input';

const MOCK_GROUPS: CDGroup[] = [
    { 
        id: '1', 
        name: 'Health and Medical Services', 
        members: [
            { id: 'm1', name: 'Aisha Bello' },
            { id: 'm2', name: 'Tunde Adebayo' },
            { id: 'm3', name: 'Ngozi Okafor' },
        ]
    },
    { 
        id: '2', 
        name: 'Environmental Protection and Sanitation', 
        members: [
            { id: 'm4', name: 'Garba Mohammed' },
            { id: 'm5', name: 'Funke Akindele' },
        ]
    },
    { 
        id: '3', 
        name: 'Education Development Group', 
        members: [
            { id: 'm6', name: 'Sade Aliu' },
            { id: 'm7', name: 'Chinedu Eze' },
            { id: 'm8', name: 'Femi Otedola' },
            { id: 'm9', name: 'Zainab Idris' },
        ]
    },
];

const CDSGroups: React.FC<{ lga: LGA }> = ({ lga }) => {
    const [groups, setGroups] = useState<CDGroup[]>(MOCK_GROUPS);
    const [selectedGroup, setSelectedGroup] = useState<CDGroup | null>(groups[0]);
    const [searchTerm, setSearchTerm] = useState('');
    
    // State for adding a new member
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
    const [newMember, setNewMember] = useState({ id: '', name: '' });

    // State for adding a new group
    const [isNewGroupModalOpen, setIsNewGroupModalOpen] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');

    // --- Member Modal ---
    const handleOpenAddMemberModal = () => setIsAddMemberModalOpen(true);

    const handleCloseAddMemberModal = () => {
        setIsAddMemberModalOpen(false);
        setNewMember({ id: '', name: '' }); // Reset form
    };

    const handleSaveMember = () => {
        if (!newMember.name.trim() || !newMember.id.trim() || !selectedGroup) {
            alert("Please provide both a name and an ID for the new member.");
            return;
        }

        const memberToAdd: CDSGroupMember = { id: newMember.id, name: newMember.name };

        const updatedGroups = groups.map(group => {
            if (group.id === selectedGroup.id) {
                return { ...group, members: [...group.members, memberToAdd] };
            }
            return group;
        });

        setGroups(updatedGroups);
        const updatedSelectedGroup = updatedGroups.find(g => g.id === selectedGroup.id);
        setSelectedGroup(updatedSelectedGroup || null);
        
        handleCloseAddMemberModal();
    };

    // --- New Group Modal ---
    const handleOpenNewGroupModal = () => setIsNewGroupModalOpen(true);
    
    const handleCloseNewGroupModal = () => {
        setIsNewGroupModalOpen(false);
        setNewGroupName('');
    };

    const handleSaveNewGroup = () => {
        if (!newGroupName.trim()) {
            alert("Please enter a name for the new CDS group.");
            return;
        }

        const newGroup: CDGroup = {
            id: new Date().toISOString(),
            name: newGroupName,
            members: []
        };

        setGroups([...groups, newGroup]);
        handleCloseNewGroupModal();
    };


    const filteredMembers = selectedGroup 
        ? selectedGroup.members.filter(member => 
            member.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : [];

    return (
        <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">CDS Groups Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <Card title="CDS Groups" actions={<Button variant="secondary" onClick={handleOpenNewGroupModal}>New Group</Button>}>
                        <div className="space-y-2">
                           {groups.map(group => (
                                <button 
                                    key={group.id} 
                                    onClick={() => {
                                        setSelectedGroup(group);
                                        setSearchTerm(''); // Reset search on group change
                                    }}
                                    className={`w-full text-left p-3 rounded-md transition-colors ${selectedGroup?.id === group.id ? 'bg-green-700 text-white' : 'hover:bg-gray-100'}`}
                                >
                                    <p className="font-semibold">{group.name}</p>
                                    <p className="text-sm">{group.members.length} members</p>
                                </button>
                           ))}
                        </div>
                    </Card>
                </div>
                <div className="md:col-span-2">
                    {selectedGroup ? (
                        <Card title={`Members of ${selectedGroup.name}`} actions={<Button onClick={handleOpenAddMemberModal}>Add Member</Button>}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Search members..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                />
                            </div>
                            {filteredMembers.length > 0 ? (
                                <ul className="divide-y divide-gray-200 h-96 overflow-y-auto">
                                    {filteredMembers.map(member => (
                                        <li key={member.id} className="py-3 px-1">
                                            {member.name}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-center text-gray-500 py-4">No members found.</p>
                            )}
                        </Card>
                    ) : (
                        <Card title="No Group Selected">
                            <p className="text-center text-gray-500">Please select a CDS group from the list to view its members.</p>
                        </Card>
                    )}
                </div>
            </div>

            {/* Add Member Modal */}
            {selectedGroup && (
                <Modal isOpen={isAddMemberModalOpen} onClose={handleCloseAddMemberModal} title={`Add Member to ${selectedGroup.name}`}>
                    <div className="space-y-4">
                        <Input
                            label="Member ID / Corps Number"
                            id="memberId"
                            type="text"
                            value={newMember.id}
                            onChange={(e) => setNewMember({ ...newMember, id: e.target.value })}
                            placeholder="e.g., KTS/24B/1234"
                            required
                        />
                        <Input
                            label="Member Full Name"
                            id="memberName"
                            type="text"
                            value={newMember.name}
                            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                            placeholder="e.g., Jane Doe"
                            required
                        />
                        <div className="flex justify-end space-x-2 pt-4">
                            <Button variant="secondary" onClick={handleCloseAddMemberModal}>Cancel</Button>
                            <Button onClick={handleSaveMember}>Save Member</Button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* New Group Modal */}
            <Modal isOpen={isNewGroupModalOpen} onClose={handleCloseNewGroupModal} title="Create New CDS Group">
                <div className="space-y-4">
                    <Input
                        label="Group Name"
                        id="groupName"
                        type="text"
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        placeholder="e.g., Anti-Corruption and Transparency Unit (ACTU)"
                        required
                    />
                    <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="secondary" onClick={handleCloseNewGroupModal}>Cancel</Button>
                        <Button onClick={handleSaveNewGroup}>Create Group</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CDSGroups;