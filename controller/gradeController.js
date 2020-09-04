import { db } from '../models/index.js';

const Grade = db.gradeModel;

const create = async (req, res) => {
	const grade = new Grade({
		name: req.body.name,
		subject: req.body.subject,
		type: req.body.type,
		value: req.body.value,
		lastModified: new Date(),
	});

	try {
		const data = await grade.save();
		res.send({ message: 'Grade inserido com sucesso' });
	} catch (error) {
		res
			.status(500)
			.send({ message: error.message || 'Algum erro ocorreu ao salvar' });
	}
};

const findAll = async (req, res) => {
	const name = req.query.name;

	//condicao para o filtro no findAll
	let condition = name
		? { name: { $regex: new RegExp(name), $options: 'i' } }
		: {};

	try {
		const data = await Grade.find(condition);

		if (!data) {
			res.status(404).send('Nenhuma Grade encontrada');
		} else {
			res.send(data);
		}
	} catch (error) {
		res
			.status(500)
			.send({ message: error.message || 'Erro ao listar todos os documentos' });
	}
};

const findOne = async (req, res) => {
	const id = req.params.id;

	try {
		const data = await Grade.findById({ _id: id });

		if (!data) {
			res.status(404).send('Nenhuma grade foi encontrada');
		} else {
			res.send(data);
		}
	} catch (error) {
		res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
	}
};

const update = async (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: 'Dados para atualizacao vazios',
		});
	}

	const id = req.params.id;

	try {
		const data = await Grade.findByIdAndUpdate({ _id: id }, req.body, {
			new: true,
		});

		if (!data) {
			res.status(404).send('Nenhuma grade encontrada para atualizar');
		} else {
			res.send(data);
		}
	} catch (error) {
		res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
	}
};

const remove = async (req, res) => {
	const id = req.params.id;

	try {
		const data = await Grade.findByIdAndRemove({ _id: id });

		if (!data) {
			res.status(404).send('Nenhuma grade foi encotrada para excluir');
		} else {
			res.send('Grade excluida com sucesso');
		}
	} catch (error) {
		res
			.status(500)
			.send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
	}
};

const removeAll = async (req, res) => {
	try {
		const data = await Grade.deleteMany();

		if (!data) {
			res.status(404).send('Nenhuma grade foi encontrada para excluir');
		} else {
			res.send('Grades excluidas com sucesso');
		}
	} catch (error) {
		res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
	}
};

export default { create, findAll, findOne, update, remove, removeAll };
