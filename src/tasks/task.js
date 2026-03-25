// ok so this is basically the system inside of cb2 that well handles many things
// from what I understand almost everything is a task in these games as in meaning
// cb2 would call runTasks(); and inside that list of tasks to run this frame you
// could have like npc dialouge (I don't think thats how you spell that...) or something

// update: so yea this turned out far more complicated because erm... the tasks have to be able to delete
// themselves and even other tasks and you have to keep track of this otherwise you will end up
// skipping over tasks or something...

const NUM_TASKS = 16; // ok so this is basically the max amount of tasks allowed it cannot surpass 16 which I think may mostly be a limit due to the GBA so perhaps I will remove the limit later idk
const NUM_TASK_DATA = 16; // this is basically the "memory" that each task is allowed to use also thinking of removing this later
// however since we are no longer in the C world I think this can be replaced... but thats for later I guess

const HEAD_SENTINEL = 0xFE; // so these things are weird basically this is meant to make sure that no tasks are behind it
const TAIL_SENTINEL = 0xFF; // and this makes sure no tasks are in front of it basically both of these represent the extreme ends from the start to finish I think...

export const gTasks = new Array(NUM_TASKS); // so yea this is the memory pool basically it contains all active/inactive slots for every task

function TaskDummy(taskId) { } // just a dummy function that goes into task for their initialization


export function ResetTasks() { // this initializes all the tasks and doubles as a reset
    for (let i = 0; i < NUM_TASKS; i++) {
        gTasks[i] = { // this is the task shape incase anyone is curious
            isActive: false, // self explanitory this dictates whether the task is active or not
            func: TaskDummy, // this is what the task actually runs
            followupFunc: null, // this lets you replace the original func with different logic
            prev: i, // so this and next are the actual like task list
            next: i + 1,
            priority: -1, // this dictates which task runs first the smaller the number the higher the priority
            data: new Int16Array(NUM_TASK_DATA), // and this is the tasks memory basically if this was a modern thing though this really wouldn't be needed at least in the way its implemented
        };
    }

    gTasks[0].prev = HEAD_SENTINEL;
    gTasks[NUM_TASKS - 1].next = TAIL_SENTINEL;
}

export function CreateTask(func, priority) { // as per the name this creates a task
    for (let i = 0; i < NUM_TASKS; i++) {
        if (!gTasks[i].isActive) { // basically we search the list until we find a empty slot
            gTasks[i].func = func;
            gTasks[i].priority = priority;
            InsertTask(i);
            gTasks[i].data.fill(0);
            gTasks[i].isActive = true;
            // and all that stuff happens which basically makes a task be an actual task that can do stuff and so on :p
            return i;
        }
    }

    return -1;
}

function InsertTask(newTaskId) { // this is well responsible for inserting a task into the list
    let taskId = FindFirstActiveTask(); // this finds the head (honestly self explanitory)

    if (taskId === NUM_TASKS) { // this just checks if there is no tasks at all and handles that
        gTasks[newTaskId].prev = HEAD_SENTINEL;
        gTasks[newTaskId].next = TAIL_SENTINEL;
        return;
    }

    while (true) { // pretty simple I don't think I have to explain this hopefully? but eh just in case here we go
        if (gTasks[newTaskId].priority < gTasks[taskId].priority) { // this block inserts higher priority tasks before lower priority ones
            gTasks[newTaskId].prev = gTasks[taskId].prev;
            gTasks[newTaskId].next = taskId;

            if (gTasks[taskId].prev !== HEAD_SENTINEL)
                gTasks[gTasks[taskId].prev].next = newTaskId;

            gTasks[taskId].prev = newTaskId;
            return;
        }

        if (gTasks[taskId].next === TAIL_SENTINEL) { // simply this checks if the task is trying to put into the tail end task and if so it places it before it without you know breaking stuff :o
            gTasks[newTaskId].prev = taskId;
            gTasks[newTaskId].next = TAIL_SENTINEL;
            gTasks[taskId].next = newTaskId;
            return;
        }

        taskId = gTasks[taskId].next;
    }
}

export function DestroyTask(taskId) { // this allows tasks to destroy themselves when they execute their own code which is surprisingly common based on the limited tasks I saw...
    if (!gTasks[taskId].isActive) return;

    gTasks[taskId].isActive = false; // so this is mainly what "kills" the task

    // these blocks just handle the 3 possible cases for when a task is detroyed
    if (gTasks[taskId].prev === HEAD_SENTINEL) {
        if (gTasks[taskId].next !== TAIL_SENTINEL)
            gTasks[gTasks[taskId].next].prev = HEAD_SENTINEL;
    } else {
        if (gTasks[taskId].next === TAIL_SENTINEL) {
            gTasks[gTasks[taskId].prev].next = TAIL_SENTINEL;
        } else {
            gTasks[gTasks[taskId].prev].next = gTasks[taskId].next;
            gTasks[gTasks[taskId].next].prev = gTasks[taskId].prev;
        }
    }
}

export function RunTasks() { // very very simple just runs the already sorted list of tasks
    let taskId = FindFirstActiveTask();

    while (taskId !== NUM_TASKS && taskId !== TAIL_SENTINEL) {
        const current = taskId; // I might have to change this if tasks start acting weird but in theory I think it should be ever so slightly safer than the original version... then again who knows maybe I made a huge mistake lol
        taskId = gTasks[current].next; // I should probably mention this because its at least slightly important I think... but basically we grab the next task in the list before executing so we always know what to execute
        gTasks[current].func(current);
    }
}

function FindFirstActiveTask() { // very simple it finds the task that is right in front of head_sentinel thus assigning it the first task
    for (let i = 0; i < NUM_TASKS; i++) {
        if (gTasks[i].isActive && gTasks[i].prev === HEAD_SENTINEL)
            return i;
    }

    return NUM_TASKS;
}

export function FuncIsActiveTask(func) { // basically checks if a function from a task is currently running
    for (let i = 0; i < NUM_TASKS; i++) {
        if (gTasks[i].isActive && gTasks[i].func === func)
            return true;
    }

    return false;
}

export function FindTaskIdByFunc(func) { // lets you find a specific task by its function
    for (let i = 0; i < NUM_TASKS; i++) {
        if (gTasks[i].isActive && gTasks[i].func === func)
            return i;
    }

    return -1;
}

export function GetTaskCount() {// I feel like these notes are starting to get redundant... but this lets you know how many tasks there are
    let count = 0;

    for (let i = 0; i < NUM_TASKS; i++)
        if (gTasks[i].isActive) count++;

    return count;
}

export function SetTaskFuncWithFollowupFunc(taskId, func, followupFunc) { // this allows you to create a task with a follow up function so you get to set a first function then a follow up function to execute more code
    gTasks[taskId].followupFunc = followupFunc;
    gTasks[taskId].func = func;
}

export function SwitchTaskToFollowupFunc(taskId) { // this is where the previous function comes in handy it lets you switch the main func inside of the task with your follow up function on a specific task
    if (gTasks[taskId].followupFunc)
        gTasks[taskId].func = gTasks[taskId].followupFunc;
}

export function SetWordTaskArg(taskId, dataElem, value) { // so I really don't think we need this function or the one below their main purpose was to get 2 16 bit numbers and then mash them together to make a 32 bit number pretty much this was useful back in the GBA days but since we have far bigger numbers now I don't think we need this... but for now it can sit here
    if (dataElem <= 14) {
        gTasks[taskId].data[dataElem] = value & 0xFFFF;
        gTasks[taskId].data[dataElem + 1] = (value >>> 16) & 0xFFFF;
    }
}

export function GetWordTaskArg(taskId, dataElem) {
    if (dataElem <= 14) {
        return (
            (gTasks[taskId].data[dataElem] & 0xFFFF) |
            ((gTasks[taskId].data[dataElem + 1] & 0xFFFF) << 16)
        ) >>> 0;
    }

    return 0;
}