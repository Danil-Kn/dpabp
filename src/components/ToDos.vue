<template>
    <!-- Старый компонент to-do листа -->
    <div class="todo-container w3-white w3-card-4">
        <!-- Simple header -->
        <div class="w3-container w3-black w3-margin-0 w3-bottombar w3-border-blue">
            <h1>
                <i class="fa-solid fa-clipboar-list">
                    To-Do List
                </i>
            </h1>
        </div>

        <!-- User input -->
        <div class="w3-container flex-container w3-light-gray w3-padding">
            <input class="w3-input w3-border-0" type="text" autofocus v-model="_todo_text" @keyup.enter="addToDo()"
                placeholder="Type here your to-do item...">
            <button class="w3-button w3-gray" @click="clearToDo()">
                <i class="fa-solid fa-times"></i>
            </button>
            <button class="w3-button w3-blue" @click="addToDo()">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>

        <!-- List of pending items -->
        <div class="w3-padding w3-blue">
            Pending ({{ _pending.length }})
        </div>
        <div class="w3-padding" v-for="todo in _pending" :key="todo.id">
            <label>
                <input type="checkbox" v-model="todo.checked">
                <span class="w3-margin-left">
                    {{ todo.text }}
                </span>
            </label>
        </div>
        <div class="w3-padding" v-show="!_pending.length">
            No tasks
        </div>

        <!-- List of completed tasks -->
        <div class="w3-padding w3-blue">
            Completed ({{ _done.length }})
        </div>
        <div class="w3-padding" v-for="todo in _done" :key="todo.id">
            <label>
                <input type="checkbox" v-model="todo.checked">
                <span class="w3-margin-left">
                    {{ todo.text }}
                </span>
            </label>
        </div>
        <div class="w3-padding" v-show="!_done.length">
            No tasks
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const _todo_text = ref('')
const _todo_list = ref([])

const _pending = computed(() => _todo_list.value.filter(item => !item.checked))
const _done = computed(() => _todo_list.value.filter(item => item.checked))

function clearToDo() {
    _todo_text.value = ''
}

function addToDo() {
    if (_todo_text.value) {
        _todo_list.value.push({ id: new Date().valueOf(), text: _todo_text.value, checked: false })
        clearToDo()
    }
}

</script>

<style scoped>
.todo-container {
    max-width: 100%;
    min-width: 30rem;
}

label {
    display: flex;
    cursor: pointer;
}
</style>