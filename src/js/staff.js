
    // 1. Staff data
    const staffKey = 'brightstar-staff';

    let staff = JSON.parse(localStorage.getItem(staffKey) || 'null') || [
        {
            id: 1,
            name: 'Principal Adelle',
            role: 'Principal',
            department: 'Administration',
            email: 'principal@brightstar.example',
            phone: '+254 700 000 001',
            status: 'Active'
        },
        {
            id: 2,
            name: 'Grace Wanjiku',
            role: 'Head of Department',
            department: 'Sciences & Mathematics',
            email: 'grace@brightstar.example',
            phone: '+254 700 000 002',
            status: 'Active'
        },
        {
            id: 3,
            name: 'Brian Otieno',
            role: 'Teacher',
            department: 'Technology & Computing',
            email: 'brian@brightstar.example',
            phone: '+254 700 000 003',
            status: 'On leave'
        },
        {
            id: 4,
            name: 'Amina Hassan',
            role: 'Secretary',
            department: 'Administration',
            email: 'amina@brightstar.example',
            phone: '+254 700 000 004',
            status: 'Active'
        }
    ];

    let editingId = null;

    // 2. Find HTML elements
    const staffTable = document.getElementById('staff-table-body');
    const staffDialog = document.getElementById('staff-dialog');
    const staffForm = document.getElementById('staff-form');
    const staffFields = document.getElementById('staff-fields');

    // 3. Save staff in the browser
    function saveStaff() {
        localStorage.setItem(staffKey, JSON.stringify(staff));
    }

    // 4. Create the form fields
    const fields = [
        { name: 'name', label: 'Full name', type: 'text' },
        { name: 'role', label: 'Role', type: 'text' },
        { name: 'department', label: 'Department', type: 'text' },
        { name: 'email', label: 'Email address', type: 'email' },
        { name: 'phone', label: 'Phone number', type: 'tel' },
        { name: 'status', label: 'Status', type: 'select' }
    ];

    fields.forEach(function(field) {
        const label = document.createElement('label');
        label.textContent = field.label;
        label.className = 'block text-sm font-medium text-slate-700';

        let input;

        if (field.type === 'select') {
            input = document.createElement('select');

            ['Active', 'On leave'].forEach(function(status) {
                const option = document.createElement('option');
                option.value = status;
                option.textContent = status;
                input.appendChild(option);
            });
        } else {
            input = document.createElement('input');
            input.type = field.type;
            input.required = true;
        }

        input.name = field.name;
        input.id = 'staff-' + field.name;
        input.className =
            'w-full rounded-lg border border-slate-300 px-4 py-3 text-sm';

        label.htmlFor = input.id;

        const wrapper = document.createElement('div');
        wrapper.className = 'space-y-2';
        wrapper.append(label, input);

        staffFields.appendChild(wrapper);
    });

    // 5. Display staff and update statistics
    function renderStaff() {
        const search = document.getElementById('staff-search')
            .value.toLowerCase();

        const status = document.getElementById('staff-status-filter').value;

        const filteredStaff = staff.filter(function(person) {
            const text = (
                person.name + ' ' +
                person.role + ' ' +
                person.department + ' ' +
                person.email
            ).toLowerCase();

            return text.includes(search) &&
                (status === 'all' || person.status === status);
        });

        staffTable.innerHTML = '';

        filteredStaff.forEach(function(person) {
            const row = document.createElement('tr');
            row.className = 'border-b border-slate-100';

            row.innerHTML = `
                <td class="p-3 font-bold text-slate-900">
                    ${escapeHTML(person.name)}
                </td>
                <td class="p-3">
                    ${escapeHTML(person.role)}
                    <p class="text-slate-400">
                        ${escapeHTML(person.department)}
                    </p>
                </td>
                <td class="p-3">
                    ${escapeHTML(person.email)}
                    <p class="text-slate-400">
                        ${escapeHTML(person.phone)}
                    </p>
                </td>
                <td class="p-3">
                    <span class="rounded-full px-2 py-1 text-xs ${
                        person.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                    }">
                        ${escapeHTML(person.status)}
                    </span>
                </td>
                <td class="space-x-2 p-3 text-right">
                    <button type="button"
                        data-action="edit"
                        data-id="${person.id}"
                        class="text-blue-600">
                        Edit
                    </button>
                    <button type="button"
                        data-action="delete"
                        data-id="${person.id}"
                        class="text-red-600">
                        Delete
                    </button>
                </td>
            `;

            staffTable.appendChild(row);
        });

        document.getElementById('staff-empty')
            .classList.toggle('hidden', filteredStaff.length > 0);

        document.getElementById('staff-total').textContent = staff.length;

        document.getElementById('staff-teaching').textContent =
            staff.filter(function(person) {
                return ['Teacher', 'Head of Department']
                    .includes(person.role);
            }).length;

        document.getElementById('staff-support').textContent =
            staff.filter(function(person) {
                return !['Teacher', 'Head of Department'].includes(person.role);
            }).length;

        document.getElementById('staff-leave').textContent =
            staff.filter(function(person) {
                return person.status === 'On leave';
            }).length;
    }

    // Prevent entered text from being interpreted as HTML
    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, function(character) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            }[character];
        });
    }

    // 6. Open the form for adding or editing
    function openStaffForm(person = null) {
        editingId = person ? person.id : null;

        staffForm.reset();

        document.getElementById('staff-dialog-title').textContent =
            person ? 'Edit staff member' : 'Add staff member';

        fields.forEach(function(field) {
            document.getElementById('staff-' + field.name).value =
                person ? person[field.name] : '';
        });

        staffDialog.showModal();
    }

    // 7. Add staff button
    document.getElementById('add-staff-button')
        .addEventListener('click', function() {
            openStaffForm();
        });

    // 8. Cancel button
    document.getElementById('staff-cancel')
        .addEventListener('click', function() {
            staffDialog.close();
        });

    // 9. Save a new staff member or edit an existing one
    staffForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(staffForm);
        const person = Object.fromEntries(formData);

        if (editingId !== null) {
            staff = staff.map(function(oldPerson) {
                return oldPerson.id === editingId
                    ? { ...oldPerson, ...person }
                    : oldPerson;
            });
        } else {
            staff.push({
                id: Date.now(),
                ...person
            });
        }

        saveStaff();
        renderStaff();
        staffDialog.close();
    });

    // 10. Edit or delete a staff member
    staffTable.addEventListener('click', function(event) {
        const button = event.target.closest('button');

        if (!button) return;

        const id = Number(button.dataset.id);

        const person = staff.find(function(item) {
            return item.id === id;
        });

        if (!person) return;

        if (button.dataset.action === 'edit') {
            openStaffForm(person);
        }

        if (button.dataset.action === 'delete') {
            if (confirm('Delete ' + person.name + '?')) {
                staff = staff.filter(function(item) {
                    return item.id !== id;
                });

                saveStaff();
                renderStaff();
            }
        }
    });

    // 11. Search and filter
    document.getElementById('staff-search')
        .addEventListener('input', renderStaff);

    document.getElementById('staff-status-filter')
        .addEventListener('change', renderStaff);

    // 12. Display the initial staff list
    renderStaff();
